import LoginButton from "@/components/auth/LoginButton";
import PostForm from "@/components/post/PostForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginButton />
      <PostForm />
    </main>
  );
}
