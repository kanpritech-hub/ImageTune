import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Editor from "@/components/Editor";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center px-4">
        <Hero />
        <Editor />
      </main>
      <Footer />
    </div>
  );
}
