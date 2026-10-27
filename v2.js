/* NOVA V2 interactions — intentionally separate from the core player */
(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];

  function setupIcons(){
    const icons={
      play:'▶',home:'⌂',compass:'◉',heart:'♡',music:'♪'
    };
    $$('[data-icon]').forEach(el=>{ if(icons[el.dataset.icon]) el.textContent=icons[el.dataset.icon]; });
  }

  function setupReveal(){
    const items=$$('[data-rv]');
    if(!('IntersectionObserver' in window)){items.forEach(x=>x.classList.add('revealed'));return;}
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target);}});
    },{threshold:.12});
    items.forEach(x=>io.observe(x));
  }

  function setupAlbumPlay(){
    const btn=$('#v2AlbumPlay');
    if(!btn)return;
    btn.addEventListener('click',()=>{
      const card=$$('.song-card')[$$('.song-card').findIndex(c=>c.classList.contains('selected'))] || $('.song-card');
      if(card){
        card.click();
        setTimeout(()=>{
          const track= $('.album-track');
          if(track) track.click();
        },120);
      }
    });
  }

  function setupLibraryTabs(){
    const tabs=$$('.v2-tabs button');
    const panels={liked:$('#likedSongsList'),recent:$('#recentList'),queue:$('#libQueue')};
    tabs.forEach(tab=>tab.addEventListener('click',()=>{
      const key=tab.dataset.tab;
      tabs.forEach(t=>t.setAttribute('aria-selected',String(t===tab)));
      Object.entries(panels).forEach(([name,p])=>{if(p)p.hidden=name!==key;});
    }));
  }

  function setupSearch(){
    document.addEventListener('keydown',event=>{
      const target=event.target;
      const typing=target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!typing){
        event.preventDefault();
        const toggle=$('#searchToggle'),search=$('#musicSearch');
        if(toggle&&search&&!search.classList.contains('open'))toggle.click();
      }
    });
  }

  function setupMiniPlayer(){
    $('#miniOpenPlayer')?.addEventListener('click',()=>$('#player')?.scrollIntoView({behavior:'smooth'}));
  }

  function setupFloatingNav(){
    const nav=$('.v2-nav');
    if(!nav)return;

    let previousY=window.scrollY;
    let scheduled=false;

    const setVisible=visible=>{
      nav.classList.toggle('nav-hidden',!visible);
      nav.setAttribute('aria-hidden',String(!visible));
      nav.inert=!visible;
    };

    if(previousY>40)setVisible(false);

    const update=()=>{
      const currentY=window.scrollY;
      if(currentY<=32)setVisible(true);
      else if(currentY>previousY+6)setVisible(false);
      else if(currentY<previousY-6)setVisible(true);
      previousY=currentY;
      scheduled=false;
    };

    window.addEventListener('scroll',()=>{
      if(!scheduled){
        scheduled=true;
        requestAnimationFrame(update);
      }
    },{passive:true});
  }

  function setupActiveNav(){
    const links=$$('.v2-link'), sections=['home','songs','liked-songs','player','together','team'].map(id=>$('#'+id)).filter(Boolean);
    const update=()=>{
      let active='home';
      sections.forEach(s=>{if(s.getBoundingClientRect().top<window.innerHeight*.42)active=s.id;});
      links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+active));
    };
    addEventListener('scroll',update,{passive:true});update();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    setupIcons();setupReveal();setupAlbumPlay();setupLibraryTabs();setupSearch();setupMiniPlayer();setupFloatingNav();setupActiveNav();
  });
})();