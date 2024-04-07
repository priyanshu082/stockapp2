import HeroSection from "../Components/Sections/HeroSection";
import SectionYoutube from "../Components/Sections/SectionYoutube";
import PlatformSection from '../Components/Sections/PlatformSection/PlatformSection';
import KnowledgeSection from "../Components/Sections/KnowledgeSection";
import FeedbackSection from "../Components/Sections/FeedbackSection";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

function Home() {
  return (
  <> 
  <div className="w-full h-auto bg-white">
<Navbar/>
     <HeroSection/>
     <SectionYoutube/>
     <PlatformSection/>
     <KnowledgeSection/>
     <FeedbackSection/>
  <Footer/>
     </div>
  </>
  );
}

export default Home;
