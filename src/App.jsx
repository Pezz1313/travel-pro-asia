import { useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TripBuilder from './components/TripBuilder.jsx';
import ItineraryResult from './components/ItineraryResult.jsx';
import PremiumForm from './components/PremiumForm.jsx';
import Destinations from './components/Destinations.jsx';
import TwoWays from './components/TwoWays.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Pricing from './components/Pricing.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import { generateDemoItinerary } from './data/itineraries.js';

export default function App() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  // Keep the user's original travel request around so we can include it
  // in the premium form payload sent to Formspree.
  const [lastPrompt, setLastPrompt] = useState('');
  const resultRef = useRef(null);

  const handleGenerate = (prompt, options) => {
    setLoading(true);
    setItinerary(null);
    setLastPrompt(prompt || '');

    // Smooth scroll to the result area as soon as the loading state appears.
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Simulate a short "AI thinking" delay for the demo.
    setTimeout(() => {
      const result = generateDemoItinerary(prompt, options);
      setItinerary(result);
      setLoading(false);
    }, 1600);
  };

  // Scroll to the result once it's ready (so user lands on the right place).
  useEffect(() => {
    if (itinerary && !loading) {
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [itinerary, loading]);

  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />

        <div className="py-8 sm:py-12">
          <TripBuilder onGenerate={handleGenerate} loading={loading} />
          <div ref={resultRef} className="mt-2">
            <ItineraryResult itinerary={itinerary} loading={loading} />
            {!loading && itinerary && (
              <PremiumForm itinerary={itinerary} originalPrompt={lastPrompt} />
            )}
          </div>
        </div>

        <Destinations />
        <TwoWays />
        <HowItWorks />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
