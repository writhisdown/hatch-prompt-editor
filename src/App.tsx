import { Header } from "@/components/Header";
import { EditorHeader } from "@/components/EditorHeader";
import { Editor } from "@/components/Editor";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <div className="bg-gray-50 min-h-screen text-gray-900">
        <Header />

        {/* Editor Section */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <EditorHeader />
            <Editor />
          </div>
        </section>
      </div>
      <Toaster position="top-right" closeButton />
    </>
  );
}
