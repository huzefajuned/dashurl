"use client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import MainSkeleton from "./components/skeletons/Main-Skeleton";
import useAuthStore from "./store/user";
import Footer from "./components/Footer";

export default function Home() {
  const { loading, user } = useAuthStore();

  if (loading) return <MainSkeleton />;
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        {user && <AnalyticsDashboard />}
      </main>
      <Footer />
    </div>
  );
}
