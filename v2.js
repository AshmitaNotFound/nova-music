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
      if(key==='queue'){
        const queue=$('#queueList');
        if(queue&&panels.queue) panels.queue.innerHTML=queue.innerHTML || '<div class="queue-item">Your queue is empty.</div>';
      }
    }));
  }

  function setupSearch(){
    const toggle=$('#searchToggle'), search=$('#musicSearch'), close=$('#searchClose'), input=$('#musicSearchInput');
    if(toggle&&search) toggle.addEventListener('click',()=>{search.classList.toggle('open');if(search.classList.contains('open'))input?.focus();});
    close?.addEventListener('click',()=>search?.classList.remove('open'));
    document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey){e.preventDefault();search?.classList.add('open');input?.focus();}});
  }

  function setupMiniPlayer(){
    $('#miniOpenPlayer')?.addEventListener('click',()=>$('#player')?.scrollIntoView({behavior:'smooth'}));
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
    setupIcons();setupReveal();setupAlbumPlay();setupLibraryTabs();setupSearch();setupMiniPlayer();setupActiveNav();
  });
})();