#!/bin/bash

npx @marp-team/marp-cli --no-stdin talk.md -o index.html

# Create a temp file with the custom scripts
cat > /tmp/marp-extras.html << 'EXTRAS'
<div id="laser" style="position:fixed;width:12px;height:12px;background:radial-gradient(circle,#ff0000 0%,#ff0000 50%,rgba(255,0,0,0.5) 100%);border-radius:50%;pointer-events:none;z-index:9999;display:none;transform:translate(-50%,-50%);box-shadow:0 0 10px 2px rgba(255,0,0,0.7);"></div>
<div id="slide-grid" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9998;overflow:auto;padding:20px;box-sizing:border-box;">
  <div id="grid-container" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:15px;"></div>
</div>
<script>
(function(){
  // Laser pointer
  const laser=document.getElementById("laser");
  let laserActive=false;

  // Slide grid/overview
  const grid=document.getElementById("slide-grid");
  const gridContainer=document.getElementById("grid-container");
  let gridVisible=false;
  let gridBuilt=false;

  function buildGrid(){
    if(gridBuilt)return;
    const svgs=document.querySelectorAll("svg[data-marpit-svg]");
    svgs.forEach((svg,i)=>{
      const wrapper=document.createElement("div");
      wrapper.style.cssText="cursor:pointer;border:2px solid #444;border-radius:4px;overflow:hidden;transition:border-color 0.2s;background:#000;";
      wrapper.addEventListener("mouseenter",()=>wrapper.style.borderColor="#70c7ff");
      wrapper.addEventListener("mouseleave",()=>wrapper.style.borderColor="#444");
      const clone=svg.cloneNode(true);
      clone.style.cssText="width:100%;height:auto;display:block;";
      wrapper.appendChild(clone);
      const label=document.createElement("div");
      label.textContent="Slide "+(i+1);
      label.style.cssText="text-align:center;padding:5px;color:#fff;font-size:12px;";
      wrapper.appendChild(label);
      wrapper.addEventListener("click",()=>{
        location.hash="#"+(i+1);
        toggleGrid();
      });
      gridContainer.appendChild(wrapper);
    });
    gridBuilt=true;
  }

  function toggleGrid(){
    gridVisible=!gridVisible;
    if(gridVisible){
      buildGrid();
      grid.style.display="block";
    }else{
      grid.style.display="none";
    }
  }

  document.addEventListener("keydown",e=>{
    // Laser pointer toggle (L key)
    if(e.key==="l"||e.key==="L"){
      laserActive=!laserActive;
      laser.style.display=laserActive?"block":"none";
    }
    // Grid toggle (Escape key)
    if(e.key==="Escape"){
      toggleGrid();
      e.preventDefault();
    }
  });

  document.addEventListener("mousemove",e=>{
    if(laserActive){
      laser.style.left=e.clientX+"px";
      laser.style.top=e.clientY+"px";
    }
  });
})();
</script>
EXTRAS

# Remove the closing tags, append custom code, then add closing tags back
sed -i '' 's/<\/body><\/html>//' index.html
cat /tmp/marp-extras.html >> index.html
echo "</body></html>" >> index.html
rm /tmp/marp-extras.html
