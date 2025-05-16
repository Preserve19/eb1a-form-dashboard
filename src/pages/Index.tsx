
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-navy-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold md:text-3xl">EB1A Application Navigator</h1>
          <p className="mt-2 text-slate-200">
            Complete your EB1A Extraordinary Ability petition documentation with our
            step-by-step guided form
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <section className="mx-auto max-w-4xl">
          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-navy-800">Start Your EB1A Application</h2>
            
            <div className="mb-6 text-gray-700">
              <p className="mb-4">
                The EB1A (Extraordinary Ability) visa category is for individuals with extraordinary ability in the sciences, arts, education, business, or athletics.
              </p>
              
              <p>
                Our application form guides you through documenting evidence for at least 3 of the 10 criteria required for your petition, helping you organize your case for USCIS review.
              </p>
            </div>
            
            <Link to="/welcome">
              <Button className="mt-4 bg-navy-800 text-white hover:bg-navy-700">
                Begin Application <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy-100 text-navy-800">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-800">Complete the Form</h3>
              <p className="text-sm text-gray-600">
                Fill out each section with detailed information about your achievements and upload supporting documents.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy-100 text-navy-800">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-800">Save Your Progress</h3>
              <p className="text-sm text-gray-600">
                You can save your progress at any time and return later to complete your application.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy-100 text-navy-800">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-800">Submit Application</h3>
              <p className="text-sm text-gray-600">
                Review your information and submit your completed application for processing.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-3 text-lg font-medium text-navy-800">EB1A Criteria</h3>
            <ul className="ml-5 list-disc space-y-2 text-sm text-gray-600">
              <li>Nationally/Internationally recognized prizes</li>
              <li>Memberships requiring outstanding achievement</li>
              <li>Published material about you in professional publications</li>
              <li>Judging the work of others in your field</li>
              <li>Original contributions of major significance</li>
              <li>+5 more criteria</li>
            </ul>
          </div>
          
          {/* Admin Access Button */}
          <div className="mt-8 flex justify-center">
            <Link to="/admin/login">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={16} />
                Admin Access
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-gray-100 py-6 text-center text-sm text-gray-600">
        <p>© 2025 StraightGreenCard EB1A Application Navigator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
