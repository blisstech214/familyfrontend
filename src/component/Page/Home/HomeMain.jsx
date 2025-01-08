import React from "react";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";
import SectionD from "./SectionD";
import SectionE from "./SectionE";
import SectionF from "./SectionF";
import SectionG from "./SectionG";
import SectionH from "./SectionH";
import SectionI from "./SectionI";
import SectionJ from "./SectionJ";
import SectionK from "./SectionK";
import Footer from "../../main/Footer";

function HomeMain() {
  return (
    <div id="home" className="space-y-28">
      <div id="sectionA">
        <SectionA />
      </div>
      <div id="sectionB">
        <SectionB />
      </div>
      <div id="sectionC">
        <SectionC />
      </div>
      <div id="sectionD">
        <SectionD />
      </div>

      {/* Section G */}
      <div>
        <SectionG />
      </div>

      {/* Section E */}
      <div>
        <SectionE />
      </div>

      {/* Section F */}
      <div>
        <SectionF />
      </div>

      {/* Section H */}
      <div>
        <SectionH />
      </div>

      {/* Section I */}
      <div>
        <SectionI />
      </div>

      {/* Section J */}
      <div>
        <SectionJ />
      </div>

      <div id="sectionK">
        <SectionK />
      </div>
      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default HomeMain;
