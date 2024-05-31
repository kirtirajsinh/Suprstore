import jwt, {
  type JwtHeader,
  type JwtPayload,
  type Secret,
  type VerifyErrors,
} from "jsonwebtoken";

// Type definition for the headers

export interface DynamicKey {
  key: Key;
}

export interface Key {
  id: string;
  publicKey: string;
}

export const getKey = (
  headers: JwtHeader,
  callback: (err: Error | null, key?: Secret) => void
): void => {
  const options = {
    method: "GET" as const, // Using 'as const' to narrow down the method type
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DYNAMIC_BEARER_TOKEN}`,
    },
  };

  fetch(
    `https://app.dynamicauth.com/api/v0/environments/${process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/keys`,
    options
  )
    .then((response) => response.json())
    .then((json: DynamicKey) => {
      const publicKey = json.key.publicKey;
      const pemPublicKey = Buffer.from(publicKey, "base64").toString("ascii");
      callback(null, pemPublicKey); // Pass the public key to the callback
    })
    .catch((err: Error) => {
      console.error(err);
      callback(err); // Pass the error to the callback
    });
};

export const validateJWT = async (token: string): Promise<JwtPayload> => {
  try {
    return await new Promise<JwtPayload>((resolve, reject) => {
      jwt.verify(
        token,
        getKey,
        { algorithms: ["RS256"] },
        (
          err: VerifyErrors | null,
          decoded: JwtPayload | string | undefined
        ) => {
          if (err) {
            reject(err);
          } else {
            if (
              typeof decoded === "object" &&
              decoded !== null &&
              "exp" in decoded
            ) {
              resolve(decoded);
            } else {
              reject(new Error("Invalid token"));
            }
          }
        }
      );
    });
  } catch (error) {
    console.error("Invalid token:", error);
    return Promise.reject(error);
  }
};
