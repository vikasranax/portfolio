(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=id=>document.getElementById(id);

/* ---------- interface text: Sanskrit (default), Hindi, English ---------- */
const TX={
sa:{title:'विकासः राणा — विकासकः',nP:'परियोजनाः',nA:'मम विषये',nC:'सम्पर्कः',name:'विकासः राणा',
lead:'अहं कृत्रिमबुद्ध्याधारितानि साधनानि, जालक्रीडाः, अध्ययनमञ्चांश्च निर्माय सार्वजनिकरूपेण प्रकाशयामि।',
open:'विकासकः · कार्यार्थं सज्जः · भारतम्',b1:'परियोजनाः',hint:'अधः लोलयत। तोरणमार्गः परियोजनाभ्यः आरभते ↓',
pH:'परियोजनाः',pI:'प्रत्येका परियोजना एकः दीपः। तस्याः कथां, तन्त्रांशं, सजीवं सम्पर्कं च पश्यत।',
all:'सर्वाणि भाण्डागाराणि GitHub-मध्ये पश्यत',aH:'मम विषये',
a1:'अहं विकासः, भारतदेशीयः विकासकः। मम द्वे बृहत्तमे परियोजने भिन्नदिशि स्तः: अर्थमॉनिटरः जगत् सजीवं पठति, पाठशाला च छात्रान् स्वभाषायां परीक्षातैयारीं कारयति।',
a2:'यानि साधनानि स्वरूपविषये सत्यानि भवन्ति तानि मह्यं रोचन्ते। अर्थमॉनिटरः नमूनादत्तांशं स्पष्टं लिखति, न तु कल्पितं दर्शयति; अत्र सर्वाः परियोजनाः GitHub-मध्ये मुक्ताः सन्ति।',
aS:'न किमपि शाश्वतम्, अतः अद्य उपयोगि यत् तदेव निर्मीयताम्।',
cH:'आगच्छत, निर्माणं कुर्मः',cI:'अहं कार्यार्थं सज्जः अस्मि। सम्पर्कस्य शीघ्रतमः मार्गः GitHub अस्ति।',cB:'परियोजनाः पुनः',
foot:'© {y} विकासः राणा · भारत:',
live:'सजीवं पश्यतु',play:'क्रीडतु',src:'स्रोतः',
badge:{live:'सजीवम्',play:'क्रीडनीयम्',oss:'मुक्तस्रोतः'},
cat:{ai:'कृत्रिमप्रज्ञा · दत्तांशः',web:'जालम् · API',games:'क्रीडा · सृजनम्'}},
hi:{title:'विकास राणा — डेवलपर',nP:'प्रोजेक्ट्स',nA:'मेरे बारे में',nC:'संपर्क',name:'विकास राणा',
lead:'मैं AI टूल्स, ब्राउज़र गेम्स और लर्निंग प्लेटफ़ॉर्म बनाता हूँ और उन्हें सबके सामने खुले में प्रकाशित करता हूँ।',
open:'डेवलपर · काम के लिए उपलब्ध · भारत',b1:'प्रोजेक्ट देखें',hint:'नीचे स्क्रॉल करें। तोरण-पथ प्रोजेक्ट्स से शुरू होता है ↓',
pH:'प्रोजेक्ट्स',pI:'हर प्रोजेक्ट एक दीप है। उसकी कहानी, टेक स्टैक और लाइव लिंक देखिए।',
all:'GitHub पर सभी रिपॉज़िटरी देखें',aH:'मेरे बारे में',
a1:'मैं विकास हूँ, भारत का एक डेवलपर। मेरे दो सबसे बड़े प्रोजेक्ट अलग दिशाओं में हैं: अर्थ मॉनिटर दुनिया को रियल-टाइम में पढ़ता है, और पाठशाला विद्यार्थियों को उनकी अपनी भाषा में परीक्षा की तैयारी कराती है।',
a2:'मुझे ऐसे टूल पसंद हैं जो ईमानदार हों। अर्थ मॉनिटर सैंपल डेटा को साफ़ लिखता है, नकली नहीं दिखाता, और यहाँ हर प्रोजेक्ट GitHub पर खुला है।',
aS:'कुछ भी शाश्वत नहीं, इसलिए वही बनाइए जो आज काम आए।',
cH:'आइए, कुछ बनाते हैं',cI:'मैं काम के लिए उपलब्ध हूँ। मुझसे जुड़ने का सबसे तेज़ तरीका GitHub है।',cB:'प्रोजेक्ट्स पर लौटें',
foot:'© {y} विकास राणा · भारत',
live:'लाइव देखें',play:'खेलें',src:'सोर्स कोड',
badge:{live:'लाइव',play:'खेलने योग्य',oss:'ओपन सोर्स'},
cat:{ai:'AI और डेटा',web:'वेब और API',games:'गेम्स और क्रिएटिव'}},
en:{title:'Vikas Rana — Developer',nP:'Projects',nA:'About',nC:'Contact',name:'Vikas Rana',
lead:'I build AI tools, browser games and learning platforms, and I ship them in public.',
open:'Developer · open to work · India',b1:'See projects',hint:'Scroll down. The torii path begins at the projects ↓',
pH:'Projects',pI:'Every project is a diya. Scroll to see what each one lights up: the story, the stack and the live link.',
all:'See every repository on GitHub',aH:'About',
a1:'I’m Vikas, a developer from India. My two biggest projects pull in opposite directions: Earth Monitor reads the world in real time, and Paathsala helps students prepare for exams in their own language.',
a2:'I like tools that are honest about what they do. Earth Monitor labels sample data instead of faking it, and every project here is open on GitHub.',
aS:'Nothing is permanent, so build what helps today.',
cH:'Let’s build something',cI:'I’m open to work. The fastest way to reach me is GitHub.',cB:'Back to projects',
foot:'© {y} By VRX · India.',
live:'Open live',play:'Play',src:'Source',
badge:{live:'Live',play:'Playable',oss:'Open source'},
cat:{ai:'AI and data',web:'Web and APIs',games:'Games and creative'}}
};

/* ---------- projects (add a project = add one object) ---------- */
const P=[
{n:'Earth Monitor',k:'ai',c:'#ff6b1a',b:'live',l:'https://jagatmanthan.vercel.app',g:'https://github.com/vikasranax/earth-monitor',t:['Next.js 15','TypeScript','Tailwind','Leaflet','Zustand'],
tag:{en:'The churning of the world, in real time',hi:'दुनिया का मंथन, रियल-टाइम में',sa:'जगतः मन्थनं, सजीवकाले'},
d:{en:'An open-source global intelligence dashboard. Geopolitics, markets, shipping, airspace and disasters sit in one terminal-style interface built on free data sources.',hi:'एक ओपन-सोर्स वैश्विक इंटेलिजेंस डैशबोर्ड। भू-राजनीति, बाज़ार, शिपिंग, हवाई क्षेत्र और आपदाएँ एक ही टर्मिनल-शैली इंटरफ़ेस में, मुफ़्त डेटा स्रोतों पर बने।',sa:'मुक्तस्रोतः वैश्विकसूचनापटलः। भूराजनीतिः, विपणयः, नौवहनं, वायुक्षेत्रं, आपदश्च एकस्मिन् सङ्केतशैलीमञ्चे निःशुल्कदत्तांशस्रोतोभिः रचिताः।'},
h:{en:['Multilayer map shows disputed territories from every claimant’s side','Live news, 60+ market symbols, ship and aircraft tracking, earthquakes','AI Copilot answers from live data with citations, in a 12-language UI'],hi:['बहु-परत मानचित्र, विवादित क्षेत्र हर दावेदार के नज़रिये से','लाइव समाचार, 60+ मार्केट सिंबल, जहाज़ और विमान ट्रैकिंग, भूकंप','AI कोपायलट लाइव डेटा से उत्तर देता है, स्रोत सहित; UI 12 भाषाओं में'],sa:['बहुस्तरीयं मानचित्रं विवादितप्रदेशान् प्रत्येकस्य दावेदारस्य दृष्ट्या दर्शयति','सजीववार्ताः, ६०+ विपणिचिह्नानि, नौकाविमानानुसरणं, भूकम्पाः','कृत्रिमप्रज्ञासहायकः सजीवदत्तांशात् प्रमाणसहितम् उत्तरति; १२ भाषासु अन्तरापृष्ठम्']}},
{n:'Paathsala',k:'web',c:'#ffc233',b:'live',l:'https://paathsala.vercel.app',g:'https://github.com/vikasranax/paathsala',t:['Next.js','TypeScript','Prisma','PostgreSQL','Redis'],
tag:{en:'One school. Every exam. Your language.',hi:'एक पाठशाला। हर परीक्षा। आपकी भाषा।',sa:'एका पाठशाला। सर्वाः परीक्षाः। भवतः भाषा।'},
d:{en:'A multilingual learning platform for SSC, NEET, JEE and UPSC preparation, built for students across India.',hi:'SSC, NEET, JEE और UPSC की तैयारी के लिए बहुभाषी लर्निंग प्लेटफ़ॉर्म, पूरे भारत के विद्यार्थियों के लिए।',sa:'SSC-NEET-JEE-UPSC-परीक्षातैयारीकृते बहुभाषिकम् अध्ययनमञ्चम्, भारतस्य सर्वेभ्यः छात्रेभ्यः।'},
h:{en:['Exam dashboards with syllabus trackers, past questions and mock tests','Adaptive daily quizzes and spaced-repetition flashcards','Deadline tracker and peer community, Hindi and English at launch'],hi:['सिलेबस ट्रैकर, पिछले वर्ष के प्रश्न और मॉक टेस्ट वाले एग्ज़ाम डैशबोर्ड','अनुकूली दैनिक क्विज़ और स्पेस्ड-रिपीटिशन फ़्लैशकार्ड','डेडलाइन ट्रैकर और पीयर कम्युनिटी; लॉन्च पर हिंदी और अंग्रेज़ी'],sa:['पाठ्यक्रमानुसरणं, पूर्वप्रश्नाः, अभ्यासपरीक्षाश्च युक्ताः परीक्षापटलाः','अनुकूलितानि दैनिकप्रश्नोत्तराणि स्मरणपुनरावृत्तिपत्रिकाश्च','अवधिसूचकः सहपाठिसमुदायश्च; आरम्भे हिन्दी-आङ्ग्लभाषे']}},
{n:'DocMind',k:'ai',c:'#2ec4b6',b:'live',l:'https://docmind-fxw0.onrender.com/',g:'https://github.com/vikasranax/docmind',t:['TypeScript','AI','Full stack'],
tag:{en:'Ask your documents anything',hi:'अपने दस्तावेज़ों से कुछ भी पूछें',sa:'स्वपत्राणि यत्किमपि पृच्छतु'},
d:{en:'Upload documents and ask questions about them. An AI model answers and cites the exact source in your document.',hi:'दस्तावेज़ अपलोड करें और उनसे सवाल पूछें। AI मॉडल उत्तर देता है और आपके दस्तावेज़ में सटीक स्रोत बताता है।',sa:'पत्राणि आरोप्य प्रश्नान् पृच्छतु। कृत्रिमप्रज्ञा उत्तरति पत्रे सटीकं स्रोतः च निर्दिशति।'},
h:{en:['Question answering over your own files','Every answer points to its source passage'],hi:['अपनी फ़ाइलों पर प्रश्नोत्तर','हर उत्तर अपने स्रोत अंश तक ले जाता है'],sa:['स्वकीयपत्रेषु प्रश्नोत्तरम्','प्रत्येकम् उत्तरं स्वस्रोतोंशं निर्दिशति']}},
{n:'Color Switch Blast',k:'games',c:'#ff4d8d',b:'play',l:'https://vikasranax.github.io/color-switch/',g:'https://github.com/vikasranax/color-switch',t:['JavaScript','Canvas'],
tag:{en:'One tap. Match the beam.',hi:'एक टैप। बीम से रंग मिलाइए।',sa:'एकः स्पर्शः। किरणेन वर्णं मेलयतु।'},
d:{en:'A fast one-tap arcade game: switch your ball’s color to match incoming neon beams. Built for the web and YouTube Playables.',hi:'तेज़ वन-टैप आर्केड गेम: आती नियॉन बीम से मिलाने के लिए गेंद का रंग बदलिए। वेब और YouTube Playables के लिए बना।',sa:'द्रुतः एकस्पर्शक्रीडा: आगच्छन्तीनां नियॉनकिरणानां वर्णेन गेन्दुकस्य वर्णं मेलयतु। जालस्य YouTube Playables-कृते च निर्मिता।'},
h:{en:['One-tap controls that work on any screen','Colorblind-friendly symbols on every beam'],hi:['एक-टैप कंट्रोल, किसी भी स्क्रीन पर','हर बीम पर कलर-ब्लाइंड-फ़्रेंडली प्रतीक'],sa:['एकस्पर्शनियन्त्रणं सर्वेषु पटलेषु','प्रत्येकस्मिन् किरणे वर्णान्धमित्राणि चिह्नानि']}},
{n:'Bounce Ball',k:'games',c:'#e63946',b:'play',l:'https://vikasranax.github.io/bounce-ball/',g:'https://github.com/vikasranax/bounce-ball',t:['JavaScript','Canvas','Physics'],
tag:{en:'Roll, bounce, collect',hi:'लुढ़कें, उछलें, बटोरें',sa:'वर्तयतु, उत्पतयतु, सङ्गृह्णातु'},
d:{en:'A rolling and bouncing physics game with obstacles, eggs, fruit and high scores.',hi:'बाधाओं, अंडों, फलों और हाई स्कोर वाला रोलिंग-बाउंसिंग फ़िज़िक्स गेम।',sa:'बाधाभिः, अण्डैः, फलैः, उच्चाङ्कैश्च युक्ता वर्तनोत्पतनभौतिकक्रीडा।'},
h:{en:['Canvas physics with obstacles and pickups','Local high scores'],hi:['बाधाओं और पिकअप के साथ कैनवस फ़िज़िक्स','लोकल हाई स्कोर'],sa:['बाधाभिः सङ्ग्रहवस्तुभिश्च सह कैनवसभौतिकी','स्थानीयाः उच्चाङ्काः']}},
{n:'INDRISMA',k:'games',c:'#9b5de5',b:'live',l:'https://indrisma.vercel.app/',g:'https://github.com/vikasranax/indrisma',t:['JavaScript','Audio API'],
tag:{en:'Your music, your visuals',hi:'आपका संगीत, आपके दृश्य',sa:'भवतः सङ्गीतं, भवतः दृश्यानि'},
d:{en:'A music and visual player. Bring your own tracks and movies and set your own backgrounds.',hi:'एक म्यूज़िक और विज़ुअल प्लेयर। अपने ट्रैक और फ़िल्में लाइए और अपनी पृष्ठभूमि चुनिए।',sa:'सङ्गीतदृश्यवादकः। स्वकीयानि गीतानि चलचित्राणि च आनयतु स्वकीयां पृष्ठभूमिं च स्थापयतु।'},
h:{en:['Play your own audio and video','Custom visual backgrounds'],hi:['अपना ऑडियो और वीडियो चलाइए','कस्टम विज़ुअल बैकग्राउंड'],sa:['स्वकीयं श्रव्यं दृश्यं च वादयतु','स्वरुचिपृष्ठभूमयः']}},
{n:'3D Product Configurator',k:'web',c:'#00b4d8',b:'live',l:'https://3d-product-configurator-inky.vercel.app/',g:'https://github.com/vikasranax/3d-product-configurator',t:['Three.js','WebGL'],
tag:{en:'Customize it in 3D',hi:'3D में कस्टमाइज़ करें',sa:'त्रिविमे स्वरुच्या रचयतु'},
d:{en:'Customize a product in real time with 3D rendering in the browser.',hi:'ब्राउज़र में 3D रेंडरिंग से प्रोडक्ट को रियल-टाइम में कस्टमाइज़ कीजिए।',sa:'अन्वेषके त्रिविमचित्रणेन उत्पादं सजीवकाले स्वरुच्या रचयतु।'},
h:{en:['Interactive 3D customization','WebGL rendering with Three.js'],hi:['इंटरैक्टिव 3D कस्टमाइज़ेशन','Three.js से WebGL रेंडरिंग'],sa:['संवादात्मकं त्रिविमरचनम्','Three.js-द्वारा WebGL-चित्रणम्']}},
{n:'TaskFlow API',k:'web',c:'#8ac926',b:'oss',g:'https://github.com/vikasranax/taskflow-api',t:['FastAPI','Docker','CI/CD'],
tag:{en:'A REST API ready for production',hi:'प्रोडक्शन के लिए तैयार REST API',sa:'उत्पादनसज्जा REST-API'},
d:{en:'A production-ready REST API with FastAPI, Docker and a CI/CD pipeline.',hi:'FastAPI, Docker और CI/CD पाइपलाइन वाली प्रोडक्शन-रेडी REST API।',sa:'FastAPI-Docker-CI/CD-प्रवाहयुक्ता उत्पादनसज्जा REST-API।'},
h:{en:['FastAPI service packaged with Docker','Automated CI/CD'],hi:['Docker में पैक किया FastAPI सर्विस','ऑटोमेटेड CI/CD'],sa:['Docker-सम्पुटिता FastAPI-सेवा','स्वचालितं CI/CD']}},
{n:'SaaS Landing Page',k:'web',c:'#f72585',b:'oss',g:'https://github.com/vikasranax/saas-landing',t:['React','TypeScript','Tailwind'],
tag:{en:'A landing page built to convert',hi:'कन्वर्ज़न के लिए बना लैंडिंग पेज',sa:'परिवर्तनार्थं रचितं प्रवेशपृष्ठम्'},
d:{en:'A conversion-focused, animated and responsive landing page.',hi:'कन्वर्ज़न पर केंद्रित, एनिमेटेड और रिस्पॉन्सिव लैंडिंग पेज।',sa:'परिवर्तनकेन्द्रितं, चलनचित्रयुक्तं, सर्वपटलानुकूलं प्रवेशपृष्ठम्।'},
h:{en:['Animated sections, mobile-first layout','Responsive on every screen size'],hi:['एनिमेटेड सेक्शन, मोबाइल-फ़र्स्ट लेआउट','हर स्क्रीन साइज़ पर रिस्पॉन्सिव'],sa:['चलनचित्रखण्डाः, चलदूरभाषप्रथमं विन्यासम्','सर्वेषु पटलमानेषु अनुकूलम्']}}
];

const diya='<svg class="diya" viewBox="0 0 80 74" aria-hidden="true"><g class="fl"><path d="M40 4C51 19 53 29 40 40C27 29 29 19 40 4Z" fill="#ffb347"/><path d="M40 17C46 26 46 32 40 38C34 32 34 26 40 17Z" fill="#fff3c4"/></g><path d="M5 42H75C73 60 58 70 40 70C22 70 7 60 5 42Z" fill="currentColor"/><path d="M5 42H75" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="54" r="2.6" fill="#ffd166"/><circle cx="40" cy="60" r="2.6" fill="#ffd166"/><circle cx="54" cy="54" r="2.6" fill="#ffd166"/></svg>';

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');io.unobserve(e.target)}}),{threshold:.12});
const cur=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('#rail a').forEach(a=>a.classList.toggle('cur',a.getAttribute('href')==='#'+e.target.id))}),{threshold:.5});
let lang='sa';

function renderProjects(){
const box=$('chapters');box.innerHTML='';const X=TX[lang];
P.forEach((p,i)=>{
const n=String(i+1).padStart(2,'0');
const a=document.createElement('article');a.className='proj'+(i%2?' alt':'');a.id='p'+(i+1);a.style.setProperty('--c',p.c);
const url=(p.l||p.g).replace(/^https?:\/\//,'').replace(/\/$/,'');
a.innerHTML=`<div class="vis rv"><div class="win"><div class="bar"><i></i><i></i><i></i><span>${url}</span></div><div class="scr"><div class="num" aria-hidden="true">${n}</div>${diya}<span class="badge">${X.badge[p.b]}</span></div></div></div>
<div class="txt rv"><div class="cat">${n} · ${X.cat[p.k]}</div><h3>${p.n}</h3><div class="tag">${p.tag[lang]}</div><p class="d">${p.d[lang]}</p><ul>${p.h[lang].map(h=>`<li>${h}</li>`).join('')}</ul><div class="chips">${p.t.map(t=>`<span class="chip">${t}</span>`).join('')}</div><div class="btns">${p.l?`<a class="btn c" href="${p.l}" target="_blank" rel="noopener">${p.k==='games'?X.play:X.live}</a>`:''}<a class="btn" href="${p.g}" target="_blank" rel="noopener">${X.src}</a></div></div>`;
box.appendChild(a);
a.querySelectorAll('.rv').forEach(e=>io.observe(e));cur.observe(a);
});
}
(function rail(){
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
let start='sa';try{const s=localStorage.getItem('vrx-lang');if(TX[s])start=s}catch(e){}
setLang(start);
document.querySelectorAll('.rv').forEach(e=>io.observe(e));

/* ---------- 3D torii path ---------- */
if(!window.THREE)return;
const cg=document.getElementById('cg');let R;try{R=new THREE.WebGLRenderer({canvas:document.getElementById('gl'),antialias:true})}catch(e){return}
R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene();S.background=new THREE.Color(0x0b0a1a);S.fog=new THREE.FogExp2(0x1a1038,.03);
const C=new THREE.PerspectiveCamera(60,1,.1,400);
const glow=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,200,110,1)');g.addColorStop(.35,'rgba(255,140,60,.5)');g.addColorStop(1,'rgba(255,100,40,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})();
S.add(new THREE.AmbientLight(0x6a5aa0,.8));
const lamp=new THREE.PointLight(0xffa860,1.6,40);S.add(lamp);
const red=new THREE.MeshLambertMaterial({color:0xe8452c,emissive:0x3a0d06}),blk=new THREE.MeshLambertMaterial({color:0x1a1226});
const N=14,GAP=14,GS=38,TR=GS+(N-1)*GAP-14;
for(let i=0;i<N;i++){
const g=new THREE.Group(),z=-GS-i*GAP;
[-3.3,3.3].forEach(x=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.34,.4,8,14),red);p.position.set(x,4,0);g.add(p);const b=new THREE.Mesh(new THREE.BoxGeometry(.9,.35,.9),blk);b.position.set(x,.17,0);g.add(b)});
const nuki=new THREE.Mesh(new THREE.BoxGeometry(7.4,.32,.4),red);nuki.position.y=6.3;g.add(nuki);
const kasa=new THREE.Mesh(new THREE.BoxGeometry(10.6,.5,.8),blk);kasa.position.y=8.3;g.add(kasa);
const sh=new THREE.Mesh(new THREE.BoxGeometry(9.4,.5,.6),red);sh.position.y=7.8;g.add(sh);
[-1,1].forEach(s=>{const t=new THREE.Mesh(new THREE.BoxGeometry(1.4,.4,.8),blk);t.position.set(s*5.4,8.6,0);t.rotation.z=s*-.3;g.add(t)});
g.position.z=z;S.add(g);
}
const lanterns=[];
for(let i=0;i<44;i++){
const g=new THREE.Group(),side=i%2?1:-1,y=4.6+Math.random()*3;
const body=new THREE.Mesh(new THREE.SphereGeometry(.5,14,12),new THREE.MeshBasicMaterial({color:0xffb45a,fog:false}));body.scale.set(1,1.3,1);g.add(body);
const h=new THREE.Sprite(new THREE.SpriteMaterial({map:glow,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true}));h.scale.set(4.2,4.2,1);g.add(h);
g.position.set(side*(5+Math.random()*3),y,-(24+i*5.2));g.userData={y,ph:Math.random()*6};S.add(g);lanterns.push(g);
}
const ground=new THREE.Mesh(new THREE.PlaneGeometry(60,400),new THREE.MeshLambertMaterial({color:0x120c28}));ground.rotation.x=-Math.PI/2;ground.position.z=-180;S.add(ground);
const path=new THREE.Mesh(new THREE.PlaneGeometry(4.6,400),new THREE.MeshLambertMaterial({color:0x2a2150}));path.rotation.x=-Math.PI/2;path.position.set(0,.02,-225);S.add(path);
const moon=new THREE.Mesh(new THREE.CircleGeometry(14,48),new THREE.MeshBasicMaterial({color:0xfff1d0,fog:false}));S.add(moon);
const mh=new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:0xffd9a0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.35,fog:false}));mh.scale.set(90,90,1);S.add(mh);
const mt=new THREE.Mesh(new THREE.PlaneGeometry(260,26),new THREE.MeshBasicMaterial({color:0x0e0a22,fog:false}));S.add(mt);
// stars
const sp=new Float32Array(600);for(let i=0;i<200;i++){sp[i*3]=(Math.random()-.5)*300;sp[i*3+1]=14+Math.random()*80;sp[i*3+2]=-250}
const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(sp,3));const stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xfff1d0,size:1.2,fog:false}));S.add(stars);
// sakura
const PN=700,pp=new Float32Array(PN*3),pv=[];
for(let i=0;i<PN;i++){pp[i*3]=(Math.random()-.5)*34;pp[i*3+1]=Math.random()*14;pp[i*3+2]=10-Math.random()*220;pv.push(.4+Math.random()*.7)}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
S.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0xffb7c8,size:.2,transparent:true,opacity:.9})));
const far=[];
function ridge(col,dz,h,seed,peakX){const sh=new THREE.Shape();sh.moveTo(-260,0);let r=seed;for(let x=-260;x<=260;x+=13){r=(r*9301+49297)%233280;let y=h*.35+(r/233280)*h*.5;y+=Math.max(0,h*1.5-Math.abs(x-peakX)*.9);sh.lineTo(x,y)}sh.lineTo(260,0);const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),new THREE.MeshBasicMaterial({color:col,fog:false}));S.add(m);far.push([m,dz,0])}
ridge(0x2c1b52,-190,16,7,-60);ridge(0x1d1340,-165,12,3,70);ridge(0x130d2b,-140,8,11,-10);
const pag=new THREE.Group(),dm=new THREE.MeshBasicMaterial({color:0x0a0818,fog:false});
for(let i=0;i<5;i++){const w=1.8-i*.25;const b=new THREE.Mesh(new THREE.BoxGeometry(w,1.3,w),dm);b.position.y=i*2.1+.65;pag.add(b);const r=new THREE.Mesh(new THREE.ConeGeometry(2.8-i*.38,.9,4),dm);r.rotation.y=Math.PI/4;r.position.y=i*2.1+1.6;pag.add(r)}
const sp2=new THREE.Mesh(new THREE.CylinderGeometry(.04,.08,3,6),dm);sp2.position.y=11.6;pag.add(sp2);
pag.scale.setScalar(2.2);pag.position.set(46,0,0);S.add(pag);far.push([pag,-120,0]);
const rings=[16,21].map((r,i)=>{const m=new THREE.Mesh(new THREE.RingGeometry(r,r+.18,80),new THREE.MeshBasicMaterial({color:0xf2b84b,transparent:true,opacity:.3-i*.12,fog:false}));S.add(m);return m});
const sky=[];for(let i=0;i<24;i++){const s2=new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:0xffc070,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85,fog:false}));s2.scale.set(2.6,3.2,1);s2.userData={x:(Math.random()-.5)*110,y:Math.random()*34,dz:-45-Math.random()*70,v:.4+Math.random()*.5};S.add(s2);sky.push(s2)}
let prog=0,tp=0,mx=0,my=0,tmx=0,tmy=0,T=0;
const fit=()=>{R.setSize(innerWidth,innerHeight,false);C.fov=innerWidth<innerHeight?80:60;C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()};
const pr=document.getElementById('projects');const scr=()=>{const a=pr.offsetTop-innerHeight*.5,m=document.documentElement.scrollHeight-innerHeight-a;tp=Math.max(0,Math.min(1,(scrollY-a)/m))};
addEventListener('resize',()=>{fit();scr();draw()});addEventListener('scroll',()=>{scr();if(RM)draw()},{passive:true});
addEventListener('pointermove',e=>{cg.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;tmx=e.clientX/innerWidth-.5;tmy=e.clientY/innerHeight-.5});
function draw(){
const z=6-prog*TR;
C.position.set(mx*1.4,2.3-my*.6,z);C.lookAt(mx*2,3.6+my*-.8,z-12);
lamp.position.set(0,6,z-3);
far.forEach(f=>f[0].position.z=z+f[1]);rings.forEach((r,i)=>{r.position.set(8,24,z-221);r.lookAt(C.position);r.rotation.z+=.002*(i?-1:1)});sky.forEach(k=>k.position.set(k.userData.x,k.userData.y,z+k.userData.dz));moon.position.set(8,24,z-220);moon.lookAt(C.position);mh.position.copy(moon.position);mt.position.set(0,6,z-225);stars.position.z=z;
R.render(S,C);
}
function loop(){
T+=.016;prog+=(tp-prog)*.06;mx+=(tmx-mx)*.05;my+=(tmy-my)*.05;
sky.forEach(k=>{k.userData.y+=k.userData.v*.016*4;if(k.userData.y>40)k.userData.y=0});lanterns.forEach(l=>{l.position.y=l.userData.y+Math.sin(T+l.userData.ph)*.25});
const a=pg.attributes.position.array,zc=6-prog*TR;
for(let i=0;i<PN;i++){a[i*3+1]-=pv[i]*.016;a[i*3]+=Math.sin(T+i)*.004;if(a[i*3+1]<0){a[i*3+1]=14;}if(a[i*3+2]>zc+14)a[i*3+2]-=220;}
pg.attributes.position.needsUpdate=true;
draw();requestAnimationFrame(loop);
}
fit();scr();prog=tp;
if(RM)draw();else loop();
})();