import HeroSection from "@/components/landingpage/HeroSection";
import PostForm from "@/components/post/PostForm";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroSection />
    </main>
  );
}
