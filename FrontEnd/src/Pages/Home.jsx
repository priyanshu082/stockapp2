import { useContext, useEffect, useRef } from 'react';
import HeroSection from "../Components/Sections/HeroSection";
import SectionYoutube from "../Components/Sections/SectionYoutube";
import PlatformSection from '../Components/Sections/PlatformSection/PlatformSection';
import KnowledgeSection from "../Components/Sections/KnowledgeSection";
import FeedbackSection from "../Components/Sections/FeedbackSection";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { AuthContext } from "../Context/AuthContext";
import { localapi } from "../Assets/config";
import axios from "axios";
import InfiniteMoving from "../Components/InfiniteMoving";

function Home() {
  const { setIsSubscribed, user, setUser } = useContext(AuthContext);
  const knowledgeRef = useRef(null);

  useEffect(() => {
    if (user) {
      axios.post(`${localapi}/issubscribed`, { email: user?.email }).then((result) => {
        console.log(result.data.data);
        if (typeof result.data.data !== 'string') {
          localStorage.setItem("isSubscribed", JSON.stringify(result.data.data));
        } else {
          localStorage.setItem("isSubscribed", result.data.data);
        }
        setIsSubscribed(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [user]);

  const scrollToKnowledge = () => {
    knowledgeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="w-full h-auto bg-white flex flex-col overflow-hidden relative">
        <Navbar scrollToKnowledge={scrollToKnowledge} />
        <div className="">
          <InfiniteMoving />
        </div>
        <div className="md:mt-[0px] mt-[80px]">
          <HeroSection />
        </div>
        <SectionYoutube />
        <PlatformSection />
        <div ref={knowledgeRef}>
          <KnowledgeSection />
        </div>
        <FeedbackSection />
        <Footer />
      </div>
    </>
  );
}

export default Home;
