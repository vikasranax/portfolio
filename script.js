(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=id=>document.getElementById(id);

/* ---------- interface text: Sanskrit (default), Hindi, English ---------- */
const TX={
sa:{title:'विकासः राणा — विकासकः',kick:'विकासकः · क्रीडानिर्माता · मुक्तस्रोतः',tH:'उपकरणपेटिका',g1:'अग्रभागः',g2:'पृष्ठभागः',g3:'कृत्रिमप्रज्ञा · दत्तांशः',g4:'त्रिविमं · क्रीडाः',nP:'परियोजनाः',nA:'मम विषये',nC:'सम्पर्कः',name:'विकासः राणा',
lead:'अहं कृत्रिमबुद्ध्याधारितानि साधनानि, जालक्रीडाः, अध्ययनमञ्चांश्च निर्माय सार्वजनिकरूपेण प्रकाशयामि।',
open:'विकासकः · कार्यार्थं सज्जः · भारतम्',b1:'परियोजनाः',hint:'अधः लोलयत ↓',
pH:'परियोजनाः',pI:'प्रत्येका परियोजना एकः अध्यायः। लोलयित्वा कथां, तन्त्रांशं, सजीवं सम्पर्कं च पश्यत।',
all:'सर्वाणि भाण्डागाराणि GitHub-मध्ये पश्यत',aH:'मम विषये',
a1:'अहं विकासः, भारतदेशीयः विकासकः। मम द्वे बृहत्तमे परियोजने भिन्नदिशि स्तः: अर्थमॉनिटरः जगत् सजीवं पठति, पाठशाला च छात्रान् स्वभाषायां परीक्षातैयारीं कारयति।',
a2:'यानि साधनानि स्वरूपविषये सत्यानि भवन्ति तानि मह्यं रोचन्ते। अर्थमॉनिटरः नमूनादत्तांशं स्पष्टं लिखति, न तु कल्पितं दर्शयति; अत्र सर्वाः परियोजनाः GitHub-मध्ये मुक्ताः सन्ति।',
aS:'न किमपि शाश्वतम्, अतः अद्य उपयोगि यत् तदेव निर्मीयताम्।',
cH:'आगच्छत, निर्माणं कुर्मः',cI:'अहं कार्यार्थं सज्जः अस्मि। सम्पर्कस्य शीघ्रतमः मार्गः GitHub अस्ति।',cB:'परियोजनाः पुनः',
foot:'© {y} विकासः राणा: · भारत:',
live:'सजीवं पश्यतु',play:'क्रीडतु',src:'स्रोतः',
badge:{live:'सजीवम्',play:'क्रीडनीयम्',oss:'मुक्तस्रोतः'},
cat:{ai:'कृत्रिमप्रज्ञा · दत्तांशः',web:'जालम् · API',games:'क्रीडा · सृजनम्'}},
hi:{title:'विकास राणा — डेवलपर',kick:'डेवलपर · गेम-निर्माता · ओपन सोर्स',tH:'टूलबॉक्स',g1:'फ्रंटएंड',g2:'बैकएंड',g3:'AI और डेटा',g4:'3D और गेम्स',nP:'प्रोजेक्ट्स',nA:'मेरे बारे में',nC:'संपर्क',name:'विकास राणा',
lead:'मैं AI टूल्स, ब्राउज़र गेम्स और लर्निंग प्लेटफ़ॉर्म बनाता हूँ और उन्हें सबके सामने खुले में प्रकाशित करता हूँ।',
open:'डेवलपर · काम के लिए उपलब्ध · भारत',b1:'प्रोजेक्ट देखें',hint:'नीचे स्क्रॉल करें ↓',
pH:'प्रोजेक्ट्स',pI:'हर प्रोजेक्ट एक अध्याय है। स्क्रॉल करें और कहानी, टेक स्टैक और लाइव लिंक देखें।',
all:'GitHub पर सभी रिपॉज़िटरी देखें',aH:'मेरे बारे में',
a1:'मैं विकास हूँ, भारत का एक डेवलपर। मेरे दो सबसे बड़े प्रोजेक्ट अलग दिशाओं में हैं: अर्थ मॉनिटर दुनिया को रियल-टाइम में पढ़ता है, और पाठशाला विद्यार्थियों को उनकी अपनी भाषा में परीक्षा की तैयारी कराती है।',
a2:'मुझे ऐसे टूल पसंद हैं जो ईमानदार हों। अर्थ मॉनिटर सैंपल डेटा को साफ़ लिखता है, नकली नहीं दिखाता, और यहाँ हर प्रोजेक्ट GitHub पर खुला है।',
aS:'कुछ भी शाश्वत नहीं, इसलिए वही बनाइए जो आज काम आए।',
cH:'आइए, कुछ बनाते हैं',cI:'मैं काम के लिए उपलब्ध हूँ। मुझसे जुड़ने का सबसे तेज़ तरीका GitHub है।',cB:'प्रोजेक्ट्स पर लौटें',
foot:'© {y} विकास राणा · भारत',
live:'लाइव देखें',play:'खेलें',src:'सोर्स कोड',
badge:{live:'लाइव',play:'खेलने योग्य',oss:'ओपन सोर्स'},
cat:{ai:'AI और डेटा',web:'वेब और API',games:'गेम्स और क्रिएटिव'}},
en:{title:'Vikas Rana — Developer',kick:'Developer · Game maker · Open source',tH:'Toolbox',g1:'Frontend',g2:'Backend',g3:'AI and data',g4:'3D and games',nP:'Projects',nA:'About',nC:'Contact',name:'Vikas Rana',
lead:'I build AI tools, browser games and learning platforms, and I ship them in public.',
open:'Developer · open to work · India',b1:'See projects',hint:'Scroll down ↓',
pH:'Projects',pI:'Every project is a chapter. Scroll to see the story, the stack and the live link.',
all:'See every repository on GitHub',aH:'About',
a1:'I’m Vikas, a developer from India. My two biggest projects pull in opposite directions: Earth Monitor reads the world in real time, and Paathsala helps students prepare for exams in their own language.',
a2:'I like tools that are honest about what they do. Earth Monitor labels sample data instead of faking it, and every project here is open on GitHub.',
aS:'Nothing is permanent, so build what helps today.',
cH:'Let’s build something',cI:'I’m open to work. The fastest way to reach me is GitHub.',cB:'Back to projects',
foot:'© {y} Built by VRX · India',
live:'Open live',play:'Play',src:'Source',
badge:{live:'Live',play:'Playable',oss:'Open source'},
cat:{ai:'AI and data',web:'Web and APIs',games:'Games and creative'}}
};


/* ---------- projects: add one object to add a project (art is in ART, same order) ---------- */
const P=[
{n:'Earth Monitor',k:'ai',c:'#22d3ee',b:'live',l:'https://jagatmanthan.vercel.app',g:'https://github.com/vikasranax/earth-monitor',t:['Next.js 15','TypeScript','Tailwind','Leaflet','Zustand'],
tag:{en:'The churning of the world, in real time',hi:'दुनिया का मंथन, रियल-टाइम में',sa:'जगतः मन्थनं, सजीवकाले'},
d:{en:'An open-source global intelligence dashboard. Geopolitics, markets, shipping, airspace and disasters sit in one terminal-style interface built on free data sources.',hi:'एक ओपन-सोर्स वैश्विक इंटेलिजेंस डैशबोर्ड। भू-राजनीति, बाज़ार, शिपिंग, हवाई क्षेत्र और आपदाएँ एक ही टर्मिनल-शैली इंटरफ़ेस में, मुफ़्त डेटा स्रोतों पर बने।',sa:'मुक्तस्रोतः वैश्विकसूचनापटलः। भूराजनीतिः, विपणयः, नौवहनं, वायुक्षेत्रं, आपदश्च एकस्मिन् सङ्केतशैलीमञ्चे निःशुल्कदत्तांशस्रोतोभिः रचिताः।'},
h:{en:['Multilayer map shows disputed territories from every claimant’s side','Live news, 60+ market symbols, ship and aircraft tracking, earthquakes','AI Copilot answers from live data with citations, in a 12-language UI'],hi:['बहु-परत मानचित्र, विवादित क्षेत्र हर दावेदार के नज़रिये से','लाइव समाचार, 60+ मार्केट सिंबल, जहाज़ और विमान ट्रैकिंग, भूकंप','AI कोपायलट लाइव डेटा से उत्तर देता है, स्रोत सहित; UI 12 भाषाओं में'],sa:['बहुस्तरीयं मानचित्रं विवादितप्रदेशान् प्रत्येकस्य दावेदारस्य दृष्ट्या दर्शयति','सजीववार्ताः, ६०+ विपणिचिह्नानि, नौकाविमानानुसरणं, भूकम्पाः','कृत्रिमप्रज्ञासहायकः सजीवदत्तांशात् प्रमाणसहितम् उत्तरति; १२ भाषासु अन्तरापृष्ठम्']}},
{n:'Paathsala',k:'web',c:'#ffb703',b:'live',l:'https://paathsala.vercel.app',g:'https://github.com/vikasranax/paathsala',t:['Next.js','TypeScript','Prisma','PostgreSQL','Redis'],
tag:{en:'One school. Every exam. Your language.',hi:'एक पाठशाला। हर परीक्षा। आपकी भाषा।',sa:'एका पाठशाला। सर्वाः परीक्षाः। भवतः भाषा।'},
d:{en:'A multilingual learning platform for SSC, NEET, JEE and UPSC preparation, built for students across India.',hi:'SSC, NEET, JEE और UPSC की तैयारी के लिए बहुभाषी लर्निंग प्लेटफ़ॉर्म, पूरे भारत के विद्यार्थियों के लिए।',sa:'SSC-NEET-JEE-UPSC-परीक्षातैयारीकृते बहुभाषिकम् अध्ययनमञ्चम्, भारतस्य सर्वेभ्यः छात्रेभ्यः।'},
h:{en:['Exam dashboards with syllabus trackers, past questions and mock tests','Adaptive daily quizzes and spaced-repetition flashcards','Deadline tracker and peer community, Hindi and English at launch'],hi:['सिलेबस ट्रैकर, पिछले वर्ष के प्रश्न और मॉक टेस्ट वाले एग्ज़ाम डैशबोर्ड','अनुकूली दैनिक क्विज़ और स्पेस्ड-रिपीटिशन फ़्लैशकार्ड','डेडलाइन ट्रैकर और पीयर कम्युनिटी; लॉन्च पर हिंदी और अंग्रेज़ी'],sa:['पाठ्यक्रमानुसरणं, पूर्वप्रश्नाः, अभ्यासपरीक्षाश्च युक्ताः परीक्षापटलाः','अनुकूलितानि दैनिकप्रश्नोत्तराणि स्मरणपुनरावृत्तिपत्रिकाश्च','अवधिसूचकः सहपाठिसमुदायश्च; आरम्भे हिन्दी-आङ्ग्लभाषे']}},
{n:'DocMind',k:'ai',c:'#8b7bff',b:'live',l:'https://docmind-fxw0.onrender.com/',g:'https://github.com/vikasranax/docmind',t:['TypeScript','AI','Full stack'],
tag:{en:'Ask your documents anything',hi:'अपने दस्तावेज़ों से कुछ भी पूछें',sa:'स्वपत्राणि यत्किमपि पृच्छतु'},
d:{en:'Upload documents and ask questions about them. An AI model answers and cites the exact source in your document.',hi:'दस्तावेज़ अपलोड करें और उनसे सवाल पूछें। AI मॉडल उत्तर देता है और आपके दस्तावेज़ में सटीक स्रोत बताता है।',sa:'पत्राणि आरोप्य प्रश्नान् पृच्छतु। कृत्रिमप्रज्ञा उत्तरति पत्रे सटीकं स्रोतः च निर्दिशति।'},
h:{en:['Question answering over your own files','Every answer points to its source passage'],hi:['अपनी फ़ाइलों पर प्रश्नोत्तर','हर उत्तर अपने स्रोत अंश तक ले जाता है'],sa:['स्वकीयपत्रेषु प्रश्नोत्तरम्','प्रत्येकम् उत्तरं स्वस्रोतोंशं निर्दिशति']}},
{n:'Color Switch Blast',k:'games',c:'#ff4d8d',b:'play',l:'https://vikasranax.github.io/color-switch/',g:'https://github.com/vikasranax/color-switch',t:['JavaScript','Canvas'],
tag:{en:'One tap. Match the beam.',hi:'एक टैप। बीम से रंग मिलाइए।',sa:'एकः स्पर्शः। किरणेन वर्णं मेलयतु।'},
d:{en:'A fast one-tap arcade game: switch your ball’s color to match incoming neon beams. Built for the web and YouTube Playables.',hi:'तेज़ वन-टैप आर्केड गेम: आती नियॉन बीम से मिलाने के लिए गेंद का रंग बदलिए। वेब और YouTube Playables के लिए बना।',sa:'द्रुतः एकस्पर्शक्रीडा: आगच्छन्तीनां नियॉनकिरणानां वर्णेन गेन्दुकस्य वर्णं मेलयतु। जालस्य YouTube Playables-कृते च निर्मिता।'},
h:{en:['One-tap controls that work on any screen','Colorblind-friendly symbols on every beam'],hi:['एक-टैप कंट्रोल, किसी भी स्क्रीन पर','हर बीम पर कलर-ब्लाइंड-फ़्रेंडली प्रतीक'],sa:['एकस्पर्शनियन्त्रणं सर्वेषु पटलेषु','प्रत्येकस्मिन् किरणे वर्णान्धमित्राणि चिह्नानि']}},
{n:'Bounce Ball',k:'games',c:'#ff6b6b',b:'play',l:'https://vikasranax.github.io/bounce-ball/',g:'https://github.com/vikasranax/bounce-ball',t:['JavaScript','Canvas','Physics'],
tag:{en:'Roll, bounce, collect',hi:'लुढ़कें, उछलें, बटोरें',sa:'वर्तयतु, उत्पतयतु, सङ्गृह्णातु'},
d:{en:'A rolling and bouncing physics game with obstacles, eggs, fruit and high scores.',hi:'बाधाओं, अंडों, फलों और हाई स्कोर वाला रोलिंग-बाउंसिंग फ़िज़िक्स गेम।',sa:'बाधाभिः, अण्डैः, फलैः, उच्चाङ्कैश्च युक्ता वर्तनोत्पतनभौतिकक्रीडा।'},
h:{en:['Canvas physics with obstacles and pickups','Local high scores'],hi:['बाधाओं और पिकअप के साथ कैनवस फ़िज़िक्स','लोकल हाई स्कोर'],sa:['बाधाभिः सङ्ग्रहवस्तुभिश्च सह कैनवसभौतिकी','स्थानीयाः उच्चाङ्काः']}},
{n:'INDRISMA',k:'games',c:'#34d399',b:'live',l:'https://indrisma.vercel.app/',g:'https://github.com/vikasranax/indrisma',t:['JavaScript','Audio API'],
tag:{en:'Your music, your visuals',hi:'आपका संगीत, आपके दृश्य',sa:'भवतः सङ्गीतं, भवतः दृश्यानि'},
d:{en:'A music and visual player. Bring your own tracks and movies and set your own backgrounds.',hi:'एक म्यूज़िक और विज़ुअल प्लेयर। अपने ट्रैक और फ़िल्में लाइए और अपनी पृष्ठभूमि चुनिए।',sa:'सङ्गीतदृश्यवादकः। स्वकीयानि गीतानि चलचित्राणि च आनयतु स्वकीयां पृष्ठभूमिं च स्थापयतु।'},
h:{en:['Play your own audio and video','Custom visual backgrounds'],hi:['अपना ऑडियो और वीडियो चलाइए','कस्टम विज़ुअल बैकग्राउंड'],sa:['स्वकीयं श्रव्यं दृश्यं च वादयतु','स्वरुचिपृष्ठभूमयः']}},
{n:'3D Product Configurator',k:'web',c:'#60a5fa',b:'live',l:'https://3d-product-configurator-inky.vercel.app/',g:'https://github.com/vikasranax/3d-product-configurator',t:['Three.js','WebGL'],
tag:{en:'Customize it in 3D',hi:'3D में कस्टमाइज़ करें',sa:'त्रिविमे स्वरुच्या रचयतु'},
d:{en:'Customize a product in real time with 3D rendering in the browser.',hi:'ब्राउज़र में 3D रेंडरिंग से प्रोडक्ट को रियल-टाइम में कस्टमाइज़ कीजिए।',sa:'अन्वेषके त्रिविमचित्रणेन उत्पादं सजीवकाले स्वरुच्या रचयतु।'},
h:{en:['Interactive 3D customization','WebGL rendering with Three.js'],hi:['इंटरैक्टिव 3D कस्टमाइज़ेशन','Three.js से WebGL रेंडरिंग'],sa:['संवादात्मकं त्रिविमरचनम्','Three.js-द्वारा WebGL-चित्रणम्']}},
{n:'TaskFlow API',k:'web',c:'#a3e635',b:'oss',g:'https://github.com/vikasranax/taskflow-api',t:['FastAPI','Docker','CI/CD'],
tag:{en:'A REST API ready for production',hi:'प्रोडक्शन के लिए तैयार REST API',sa:'उत्पादनसज्जा REST-API'},
d:{en:'A production-ready REST API with FastAPI, Docker and a CI/CD pipeline.',hi:'FastAPI, Docker और CI/CD पाइपलाइन वाली प्रोडक्शन-रेडी REST API।',sa:'FastAPI-Docker-CI/CD-प्रवाहयुक्ता उत्पादनसज्जा REST-API।'},
h:{en:['FastAPI service packaged with Docker','Automated CI/CD'],hi:['Docker में पैक किया FastAPI सर्विस','ऑटोमेटेड CI/CD'],sa:['Docker-सम्पुटिता FastAPI-सेवा','स्वचालितं CI/CD']}},
{n:'SaaS Landing Page',k:'web',c:'#fb923c',b:'oss',g:'https://github.com/vikasranax/saas-landing',t:['React','TypeScript','Tailwind'],
tag:{en:'A landing page built to convert',hi:'कन्वर्ज़न के लिए बना लैंडिंग पेज',sa:'परिवर्तनार्थं रचितं प्रवेशपृष्ठम्'},
d:{en:'A conversion-focused, animated and responsive landing page.',hi:'कन्वर्ज़न पर केंद्रित, एनिमेटेड और रिस्पॉन्सिव लैंडिंग पेज।',sa:'परिवर्तनकेन्द्रितं, चलनचित्रयुक्तं, सर्वपटलानुकूलं प्रवेशपृष्ठम्।'},
h:{en:['Animated sections, mobile-first layout','Responsive on every screen size'],hi:['एनिमेटेड सेक्शन, मोबाइल-फ़र्स्ट लेआउट','हर स्क्रीन साइज़ पर रिस्पॉन्सिव'],sa:['चलनचित्रखण्डाः, चलदूरभाषप्रथमं विन्यासम्','सर्वेषु पटलमानेषु अनुकूलम्']}}
];


/* ---------- vector illustrations, one per project ---------- */
const ART=[
`<circle cx="200" cy="150" r="88" class="f"/><ellipse cx="200" cy="150" rx="88" ry="28" class="s"/><ellipse cx="200" cy="150" rx="30" ry="88" class="s"/><path class="s" d="M112 150h176M200 62v176"/><path class="c" opacity=".55" d="M150 105q20-18 38-6t-6 28-34 6zM215 160q22-8 34 10t-12 34-26-12z"/><g transform="rotate(-20 200 150)"><ellipse cx="200" cy="150" rx="150" ry="40" class="s fd"/><circle r="8" class="w"><animateMotion dur="9s" repeatCount="indefinite" path="M50 150a150 40 0 1 0 300 0a150 40 0 1 0-300 0"/></circle></g><circle cx="165" cy="118" r="5" class="w pl"/><circle cx="238" cy="178" r="5" class="w pl"/>`,
`<path class="f" d="M200 215C160 195 110 195 65 210V108C110 93 160 95 200 115Z"/><path class="f" d="M200 215C240 195 290 195 335 210V108C290 93 240 95 200 115Z"/><path class="s" opacity=".7" d="M92 138q40-8 84 8M92 160q40-8 84 8M92 182q40-8 84 8M224 146q44-16 84-8M224 168q44-16 84-8M224 190q44-16 84-8"/><g class="sp"><circle cx="200" cy="70" r="24" class="c"/><path class="s" d="M200 30v-14M200 110v14M160 70h-14M240 70h14M172 42l-10-10M228 98l10 10M228 42l10-10M172 98l-10 10"/></g><text x="80" y="90" class="c fl" font-size="30">अ</text><text x="300" y="92" class="c fl" font-size="30" style="animation-delay:.8s">A</text>`,
`<rect x="110" y="45" width="130" height="170" rx="14" class="f"/><path class="s" opacity=".6" d="M130 80h70M130 105h90M130 130h60M130 155h84M130 180h50"/><rect x="126" y="97" width="98" height="16" rx="4" class="c" opacity=".35"/><g class="fl"><circle cx="258" cy="168" r="36" fill="rgba(255,255,255,.08)" stroke="#fff" stroke-width="6"/><path d="M284 195l30 32" stroke="var(--c)" stroke-width="10" stroke-linecap="round"/></g><path class="c pl" d="M305 62l7 15 15 7-15 7-7 15-7-15-15-7 15-7z"/>`,
`<g class="bm"><rect x="40" y="86" width="130" height="10" rx="5" fill="#ff4d8d"/></g><g class="bm" style="animation-delay:.5s"><rect x="40" y="145" width="130" height="10" rx="5" fill="#22d3ee"/></g><g class="bm" style="animation-delay:1s"><rect x="40" y="204" width="130" height="10" rx="5" fill="#ffb703"/></g><circle cx="262" cy="150" r="58" class="s fd"/><circle cx="262" cy="150" r="34" class="c"/><path d="M262 116a34 34 0 0 1 0 68z" fill="#fff" opacity=".25"/>`,
`<path class="s fd" opacity=".6" d="M60 70C100 220 140 220 180 70S260 220 300 70"/><line x1="40" y1="236" x2="360" y2="236" class="s"/><ellipse cx="200" cy="244" rx="38" ry="7" fill="rgba(255,255,255,.15)"/><g class="bn"><circle cx="200" cy="190" r="34" class="c"/><path d="M178 172a34 34 0 0 1 36-14" class="s" stroke="#fff" opacity=".6"/></g><rect x="290" y="200" width="46" height="36" rx="6" class="f"/><ellipse cx="82" cy="214" rx="14" ry="19" class="w" opacity=".85"/><circle cx="130" cy="222" r="12" fill="#ffb703"/>`,
`<g class="sp" style="animation-duration:8s"><circle cx="150" cy="150" r="84" fill="#0a0f2c" stroke="var(--c)" stroke-width="3"/><circle cx="150" cy="150" r="64" class="s" opacity=".4"/><circle cx="150" cy="150" r="46" class="s" opacity=".4"/><circle cx="150" cy="150" r="26" class="c"/><circle cx="150" cy="150" r="5" fill="#0a0f2c"/><path d="M150 66a84 84 0 0 1 60 25" class="s" stroke="#fff" opacity=".5"/></g><g class="c"><rect class="eq" x="262" y="90" width="14" height="120" rx="7"/><rect class="eq" style="animation-delay:.2s" x="284" y="90" width="14" height="120" rx="7"/><rect class="eq" style="animation-delay:.4s" x="306" y="90" width="14" height="120" rx="7"/><rect class="eq" style="animation-delay:.1s" x="328" y="90" width="14" height="120" rx="7"/></g><text x="230" y="70" class="w fl" font-size="34">♪</text>`,
`<g class="fl"><path d="M200 45L296 98L200 151L104 98Z" fill="var(--c)"/><path d="M104 98L200 151V252L104 199Z" fill="var(--c)" opacity=".6"/><path d="M296 98L200 151V252L296 199Z" fill="var(--c)" opacity=".35"/><path class="s" stroke="#fff" opacity=".7" d="M200 45L296 98L200 151L104 98ZM104 98V199L200 252L296 199V98M200 151V252"/></g><circle cx="140" cy="282" r="9" fill="#ff6b6b"/><circle cx="170" cy="282" r="9" fill="#ffb703"/><circle cx="200" cy="282" r="9" fill="#22d3ee"/><circle cx="230" cy="282" r="9" fill="#7c5cff"/><circle cx="260" cy="282" r="9" fill="#34d399"/>`,
`<rect x="30" y="120" width="70" height="60" rx="12" class="f"/><rect x="150" y="100" width="100" height="100" rx="16" class="f" stroke="#fff"/><rect x="300" y="120" width="70" height="60" rx="12" class="f"/><path class="s fd" d="M100 150H150M250 150H300"/><text x="200" y="160" text-anchor="middle" class="c" font-size="30" font-weight="700">{ }</text><text x="65" y="155" text-anchor="middle" class="w" font-size="13">client</text><text x="335" y="155" text-anchor="middle" class="w" font-size="13">db</text><g class="pl"><circle cx="90" cy="240" r="14" class="f"/><circle cx="160" cy="240" r="14" class="f"/><circle cx="230" cy="240" r="14" class="f"/><circle cx="300" cy="240" r="14" class="c"/></g><path class="s fd" d="M104 240H146M174 240H216M244 240H286"/><path class="s" stroke="#0a0f2c" d="M294 240l5 5 9-10"/>`,
`<rect x="50" y="40" width="300" height="210" rx="16" class="f"/><path class="s" opacity=".5" d="M50 68H350"/><circle cx="68" cy="54" r="4" class="c"/><rect x="76" y="94" width="130" height="14" rx="7" class="w" opacity=".85"/><rect x="76" y="118" width="100" height="14" rx="7" class="w" opacity=".45"/><rect x="76" y="150" width="76" height="28" rx="14" class="c"/><g class="c"><rect class="eq" x="240" y="170" width="16" height="50" rx="4"/><rect class="eq" style="animation-delay:.3s" x="266" y="140" width="16" height="80" rx="4"/><rect class="eq" style="animation-delay:.6s" x="292" y="110" width="16" height="110" rx="4"/></g><g class="fl"><path d="M130 190v38l10-9 8 16 8-4-8-16 14-1z" class="w"/></g><circle cx="114" cy="164" r="12" class="s pl"/>`
];

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');io.unobserve(e.target)}}),{threshold:.12});
let accent=null;
const cur=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;accent=e.target.dataset.c;document.querySelectorAll('#rail a').forEach(a=>a.classList.toggle('cur',a.getAttribute('href')==='#'+e.target.id))}),{threshold:.5});
let lang='sa';
function tilt(el){
el.addEventListener('pointermove',e=>{if(RM||e.pointerType==='touch')return;const r=el.getBoundingClientRect();el.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*14+'deg');el.style.setProperty('--rx',(-((e.clientY-r.top)/r.height-.5))*14+'deg')});
el.addEventListener('pointerleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')});
}
function renderProjects(){
const box=$('chapters');box.innerHTML='';const X=TX[lang];
P.forEach((p,i)=>{
const n=String(i+1).padStart(2,'0');
const a=document.createElement('article');a.className='proj'+(i%2?' alt':'');a.id='p'+(i+1);a.dataset.c=p.c;a.style.setProperty('--c',p.c);
a.innerHTML=`<div class="vis rv"><div class="art"><span class="num" aria-hidden="true">${n}</span><svg viewBox="0 0 400 300" role="img" aria-label="${p.n}">${ART[i]}</svg><span class="badge">${X.badge[p.b]}</span></div></div>
<div class="txt rv"><div class="cat">${n} · ${X.cat[p.k]}</div><h3>${p.n}</h3><div class="tag">${p.tag[lang]}</div><p class="d">${p.d[lang]}</p><ul>${p.h[lang].map(h=>`<li>${h}</li>`).join('')}</ul><div class="chips">${p.t.map(t=>`<span class="chip">${t}</span>`).join('')}</div><div class="btns">${p.l?`<a class="btn p" href="${p.l}" target="_blank" rel="noopener">${p.k==='games'?X.play:X.live}</a>`:''}<a class="btn" href="${p.g}" target="_blank" rel="noopener">${X.src}</a></div></div>`;
box.appendChild(a);tilt(a.querySelector('.art'));
a.querySelectorAll('.rv').forEach(e=>io.observe(e));cur.observe(a);
});
if(RM)document.querySelectorAll('svg').forEach(s=>s.pauseAnimations&&s.pauseAnimations());
}
(function(){
const r=$('rail');P.forEach((p,i)=>{const a=document.createElement('a');a.href='#p'+(i+1);a.textContent=String(i+1).padStart(2,'0');a.title=p.n;a.setAttribute('aria-label',p.n);r.appendChild(a)});
new IntersectionObserver(es=>es.forEach(e=>r.classList.toggle('on',e.isIntersecting)),{rootMargin:'-20% 0px -20% 0px'}).observe($('chapters'));
})();
function setLang(l){
lang=l;const X=TX[l];
document.documentElement.lang=l;document.title=X.title;
document.querySelectorAll('[data-i]').forEach(e=>{e.textContent=X[e.dataset.i].replace('{y}',new Date().getFullYear())});
document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===l));
renderProjects();
try{localStorage.setItem('vrx-lang',l)}catch(e){}
}
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>setLang(b.dataset.l));
document.querySelectorAll('.tool').forEach(tilt);
let start='sa';try{const s=localStorage.getItem('vrx-lang');if(TX[s])start=s}catch(e){}
setLang(start);
document.querySelectorAll('.rv').forEach(e=>io.observe(e));

/* ---------- 3D scene: floating shapes, scroll flies the camera through ---------- */
if(!window.THREE)return;
let R;try{R=new THREE.WebGLRenderer({canvas:$('gl'),antialias:true,alpha:true})}catch(e){return}
R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene();S.fog=new THREE.FogExp2(0x070b1c,.04);
const C=new THREE.PerspectiveCamera(55,1,.1,220);
S.add(new THREE.AmbientLight(0x8a93ff,.75));
const L1=new THREE.DirectionalLight(0xffb36b,1.7);L1.position.set(6,7,8);S.add(L1);
const L2=new THREE.DirectionalLight(0x22d3ee,1.3);L2.position.set(-7,-4,5);S.add(L2);
const cols=[0x7c5cff,0x22d3ee,0xff6b6b,0xffb703,0x34d399,0x60a5fa];
const knot=new THREE.Mesh(new THREE.TorusKnotGeometry(2.1,.6,180,24,2,3),new THREE.MeshStandardMaterial({color:0x7c5cff,metalness:.6,roughness:.28,flatShading:true}));
knot.add(new THREE.Mesh(new THREE.TorusKnotGeometry(2.5,.8,90,12,2,3),new THREE.MeshBasicMaterial({color:0x22d3ee,wireframe:true,transparent:true,opacity:.18})));
S.add(knot);
const geos=[new THREE.IcosahedronGeometry(1,0),new THREE.OctahedronGeometry(1,0),new THREE.TorusGeometry(.8,.28,10,24),new THREE.BoxGeometry(1.2,1.2,1.2),new THREE.TetrahedronGeometry(1.1,0)];
const sh=[];
for(let i=0;i<46;i++){
const m=new THREE.Mesh(geos[i%5],new THREE.MeshStandardMaterial({color:cols[i%6],metalness:.4,roughness:.35,flatShading:true}));
const sd=i%2?1:-1;m.position.set(sd*(4+Math.random()*10),(Math.random()-.5)*14,-6-i*2.4);m.scale.setScalar(.35+Math.random()*.8);
m.userData={r:[Math.random()*.01+.002,Math.random()*.01+.002],y:m.position.y,ph:Math.random()*6};S.add(m);sh.push(m);
}
const PN=600,pa=new Float32Array(PN*3);
for(let i=0;i<PN;i++){pa[i*3]=(Math.random()-.5)*40;pa[i*3+1]=(Math.random()-.5)*22;pa[i*3+2]=14-Math.random()*130}
const pgm=new THREE.BufferGeometry();pgm.setAttribute('position',new THREE.BufferAttribute(pa,3));
S.add(new THREE.Points(pgm,new THREE.PointsMaterial({color:0x9fb2ff,size:.07,transparent:true,opacity:.8})));
let prog=0,tp=0,mx=0,my=0,tmx=0,tmy=0,T=0,port=false;
const tc=new THREE.Color(0x7c5cff),cy=new THREE.Color(0x22d3ee),acc=new THREE.Color(0x22d3ee),docEl=document.documentElement;
function fit(){R.setSize(innerWidth,innerHeight,false);port=innerWidth<innerHeight;C.aspect=innerWidth/innerHeight;C.fov=port?72:55;C.updateProjectionMatrix()}
function scr(){const m=docEl.scrollHeight-innerHeight;tp=m>0?scrollY/m:0;$('bar').style.transform='scaleX('+tp+')'}
function draw(){
const z=12-prog*108,k=Math.max(0,1-prog*7)*(port?.75:1);
C.position.set(mx*1.2,-my*.8,z);C.lookAt(mx*.5,-my*.3,z-10);
knot.position.set(port?0:3.4,port?2.6:.3,0);knot.scale.setScalar(k||.0001);knot.visible=k>0;
R.render(S,C);
}
function loop(){
T+=.016;prog+=(tp-prog)*.06;mx+=(tmx-mx)*.05;my+=(tmy-my)*.05;
knot.rotation.x=T*.25+my*.6;knot.rotation.y=T*.35+mx*.8;
sh.forEach(m=>{m.rotation.x+=m.userData.r[0];m.rotation.y+=m.userData.r[1];m.position.y=m.userData.y+Math.sin(T+m.userData.ph)*.4});
if(accent)acc.set(accent);
knot.material.color.lerp(accent?acc:tc,.03);L2.color.lerp(accent?acc:cy,.04);
draw();requestAnimationFrame(loop);
}
addEventListener('resize',()=>{fit();scr();draw()});
addEventListener('scroll',()=>{scr();if(RM)draw()},{passive:true});
const cg=$('cg');
addEventListener('pointermove',e=>{cg.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;tmx=e.clientX/innerWidth-.5;tmy=e.clientY/innerHeight-.5;docEl.style.setProperty('--mx',(tmx*2).toFixed(3))});
fit();scr();prog=tp;
if(RM)draw();else loop();
})();