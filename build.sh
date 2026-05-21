#!/bin/bash

npx @marp-team/marp-cli talk.md -o index.html

# Inject laser pointer functionality before </body></html>
# The laser pointer is toggled with the 'L' key
LASER_CODE='<div id="laser" style="position:fixed;width:12px;height:12px;background:radial-gradient(circle,#ff0000 0%,#ff0000 50%,rgba(255,0,0,0.5) 100%);border-radius:50%;pointer-events:none;z-index:9999;display:none;transform:translate(-50%,-50%);box-shadow:0 0 10px 2px rgba(255,0,0,0.7);"></div><script>(function(){const laser=document.getElementById("laser");let active=false;document.addEventListener("keydown",e=>{if(e.key==="l"||e.key==="L"){active=!active;laser.style.display=active?"block":"none";}});document.addEventListener("mousemove",e=>{if(active){laser.style.left=e.clientX+"px";laser.style.top=e.clientY+"px";}});})();</script>'

# Remove the closing tags, append laser code, then add closing tags back
sed -i '' 's/<\/body><\/html>$//' index.html
echo "${LASER_CODE}</body></html>" >> index.html
