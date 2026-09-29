(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N=7000,cv=document.getElementById('gl');
  var r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
  r.setPixelRatio(Math.min(devicePixelRatio,2));
  var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,.1,100);cam.position.z=7;
  function shape(f){var a=new Float32Array(N*3);for(var i=0;i<N;i++){var p=f(i/N,i);a[i*3]=p[0];a[i*3+1]=p[1];a[i*3+2]=p[2];}return a;}
  var shapes=[
    shape(function(t,i){var u=Math.acos(1-2*((i*0.618034)%1)),v=i*2.39996,R=2;return[R*Math.sin(u)*Math.cos(v),R*Math.cos(u),R*Math.sin(u)*Math.sin(v)];}),
    shape(function(t,i){var k=i%2,a=t*Math.PI*8+k*Math.PI,y=(t-.5)*6,rr=1.1+(Math.random()-.5)*.25;return[rr*Math.cos(a),y,rr*Math.sin(a)];}),
    shape(function(t,i){var u=t*Math.PI*2*23,v=t*Math.PI*2,R=2,q=.7+Math.random()*.3;return[(R+q*Math.cos(u))*Math.cos(v),q*Math.sin(u)*1.2,(R+q*Math.cos(u))*Math.sin(v)];})
  ];
  var geo=new THREE.BufferGeometry(),pos=new Float32Array(shapes[0]);
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  var pts=new THREE.Points(geo,new THREE.PointsMaterial({color:0xb4b4ff,size:.022,transparent:true,opacity:.85,depthWrite:false}));
  sc.add(pts);
  var tgt=0,tx=0,cx=0;
  function size(){var w=innerWidth,h=innerHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
  addEventListener('resize',size);size();
  var secs=[].slice.call(document.querySelectorAll('section[data-shape]'));
  function pick(){var mid=innerHeight*.5,best=0;secs.forEach(function(s,i){var b=s.getBoundingClientRect();if(b.top<mid&&b.bottom>mid)best=i;});
    var s=secs[best];tgt=+s.dataset.shape;tx=s.id==='services'?-2.4:(s.id==='cases'||s.id==='contact'?2.6:0);if(innerWidth<800)tx=0;}
  addEventListener('scroll',pick,{passive:true});pick();
  var t0=0;
  function frame(t){
    var dt=(t-t0)/1000;t0=t;var to=shapes[tgt],k=Math.min(1,dt*2.2);
    for(var i=0;i<pos.length;i++)pos[i]+=(to[i]-pos[i])*k;
    geo.attributes.position.needsUpdate=true;
    cx+=(tx-cx)*Math.min(1,dt*3);pts.position.x=cx;
    if(!reduce)pts.rotation.y+=dt*.15;
    r.render(sc,cam);requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* Services Detailed Data & Modal Handler */
var SERVICES_DATA = [
  {
    badge: "Paid Advertising",
    title: "Google & Meta Ads Management",
    tagline: "High-ROI paid search, display, YouTube, Facebook & Instagram campaigns.",
    desc: "We build, audit, and continuously optimize paid ad campaigns. From high-intent Google Search ads to scroll-stopping Meta video ads, every rupee spent is tracked towards real sales & leads.",
    features: [
      "Google Search, Display & PMax",
      "Meta Feed & Reels Ad campaigns",
      "Creative & Copy A/B Testing",
      "Audience Targeting & Retargeting",
      "Weekly Transparent Reports",
      "Conversion Tracking Setup"
    ]
  },
  {
    badge: "AI Advertising",
    title: "OpenAI Ads & AI Search",
    tagline: "Reach users at the exact moment they ask AI for recommendations.",
    desc: "As AI search tools transform consumer discovery, we help your brand gain priority visibility in AI-assisted search and prompt recommendations alongside traditional search channels.",
    features: [
      "Conversational Query Optimization",
      "AI Recommendation Placement",
      "Brand Mention Strategy",
      "Cross-Channel Spend Tracking",
      "AI Search Benchmarking",
      "Performance Analytics"
    ]
  },
  {
    badge: "Copywriting",
    title: "Content Creation & Copywriting",
    tagline: "High-converting ad copy, landing pages, captions & blogs.",
    desc: "Words that hold attention and trigger action. We write compelling copy tuned to your brand's unique tone, designed to turn passive readers into paying customers.",
    features: [
      "High-Converting Ad Copy",
      "Landing Page Copywriting",
      "Social Media Captions & Hooks",
      "SEO-Optimized Blog Articles",
      "Brand Voice & Guidelines",
      "Email & Sales Script Writing"
    ]
  },
  {
    badge: "Automation",
    title: "Email Marketing & Automation",
    tagline: "Automated welcome series, cart recovery & newsletter retention.",
    desc: "Turn past buyers into repeat customers on autopilot. We design email workflows that nurture leads and generate recurring revenue without extra ad spend.",
    features: [
      "Automated Welcome Sequences",
      "Abandoned Cart Recovery",
      "Regular Brand Newsletters",
      "Audience List Segmentation",
      "Deliverability Optimization",
      "A/B Subject Line Testing"
    ]
  },
  {
    badge: "Social Growth",
    title: "Social Media Marketing",
    tagline: "Strategic content calendars, posting & community management.",
    desc: "Build a memorable social brand presence on Instagram, Facebook, LinkedIn, and X. We handle end-to-end content planning, publishing, and community engagement.",
    features: [
      "Monthly Content Calendar",
      "Static & Carousel Post Design",
      "Reel Concepts & Scripts",
      "Hashtag & Keyword Research",
      "Active DM & Comment Replies",
      "Monthly Growth Analytics"
    ]
  },
  {
    badge: "Design",
    title: "Graphic Designing",
    tagline: "Scroll-stopping ad creatives, social posts & brand kits.",
    desc: "Visual design that reflects premium brand quality. From ad banners that boost click-through rates to cohesive brand identity assets.",
    features: [
      "High-CTR Ad Creatives",
      "Brand Identity & Style Kits",
      "Social Media Graphics",
      "Infographics & Carousels",
      "E-books & Pitch Decks",
      "Print & Banner Assets"
    ]
  },
  {
    badge: "Video",
    title: "Video Editing",
    tagline: "Dynamic Reels, Short-Form Ads & YouTube videos.",
    desc: "Video is the highest performing media format today. We edit raw footage into fast-paced, engaging videos complete with custom captions, sound design, and motion hooks.",
    features: [
      "Instagram Reels & TikToks",
      "High-Impact Video Ad Edits",
      "YouTube Long-Form Editing",
      "Subtitles & On-Screen Captions",
      "Sound FX & Music Pacing",
      "Color Grading & Graphics"
    ]
  },
  {
    badge: "Organic Search",
    title: "SEO Strategy",
    tagline: "Sustainable top-ranking organic search results on Google.",
    desc: "Capture customers actively searching for your products or services. We optimize your website's technical health, on-page content, and keyword strategy for long-term organic growth.",
    features: [
      "Technical SEO Audits",
      "Keyword Research & Mapping",
      "On-Page Content Optimization",
      "Internal Linking Structure",
      "Speed & Mobile Optimization",
      "Monthly Keyword Ranking Reports"
    ]
  }
];

function openServiceModal(index){
  var data = SERVICES_DATA[index];
  if(!data) return;
  
  var overlay = document.getElementById('svcModalOverlay');
  var badge = document.getElementById('svcModalBadge');
  var title = document.getElementById('svcModalTitle');
  var tagline = document.getElementById('svcModalTagline');
  var desc = document.getElementById('svcModalDesc');
  var featList = document.getElementById('svcModalFeatList');
  var waBtn = document.getElementById('svcModalWaBtn');
  var mailBtn = document.getElementById('svcModalMailBtn');
  
  badge.textContent = data.badge;
  title.textContent = data.title;
  tagline.textContent = data.tagline;
  desc.textContent = data.desc;
  
  featList.innerHTML = '';
  data.features.forEach(function(f){
    var li = document.createElement('li');
    li.textContent = f;
    featList.appendChild(li);
  });
  
  var waText = encodeURIComponent("Hi We Never Miss, I want to talk about " + data.title + " for my business.");
  waBtn.href = "https://wa.me/919910449472?text=" + waText;
  mailBtn.href = "mailto:wenevermissdm@gmail.com?subject=" + encodeURIComponent("Enquiry: " + data.title);
  
  overlay.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeServiceModal(){
  var overlay = document.getElementById('svcModalOverlay');
  if(overlay){
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var modalClose = document.getElementById('svcModalClose');
  var modalOverlay = document.getElementById('svcModalOverlay');
  
  if(modalClose) modalClose.addEventListener('click', closeServiceModal);
  if(modalOverlay){
    modalOverlay.addEventListener('click', function(e){
      if(e.target === modalOverlay) closeServiceModal();
    });
  }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeServiceModal();
  });
});

document.querySelectorAll('.card').forEach(function(c, i){
  function on(){
    document.querySelectorAll('.card').forEach(function(x){x.classList.remove('on');});
    c.classList.add('on');
  }
  c.addEventListener('mouseenter', on);
  c.addEventListener('focus', on);
  c.addEventListener('click', function(e){
    on();
    openServiceModal(i);
  });
});

document.querySelectorAll('.row').forEach(function(c){
  function on(){document.querySelectorAll('.row').forEach(function(x){x.classList.remove('on');});c.classList.add('on');document.getElementById('shot').innerHTML=c.dataset.t;}
  c.addEventListener('click',on);c.addEventListener('mouseenter',on);c.addEventListener('focus',on);
});

setInterval(function(){document.getElementById('clk').textContent=new Date().toLocaleTimeString('en-GB');},1000);
