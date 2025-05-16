import HeroSection from "@/app/component/home/HeroSection";
import FeaturesSection from "@/app/component/home/FeaturesSection";
import QASection from "@/app/component/home/QASection";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-21 text-gray-900 lg:px-12">
      <HeroSection />
      <FeaturesSection />
      <QASection />
    </main>
  );
}
