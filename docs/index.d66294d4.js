const emailContainer=document.getElementById("email-container"),addEmailBtn=document.getElementById("add-email-btn"),submitBtn=document.getElementById("submit-btn"),errorMessage=document.getElementById("error-message"),maxEmails=30;addEmailBtn.addEventListener("click",(()=>{if(emailContainer.children.length<30){const e=document.createElement("input");e.type="email",e.name="emails[]",e.placeholder="Enter email address",e.required=!0,e.classList.add("email-input","w-full","border","border-gray-300","p-2","rounded"),emailContainer.appendChild(e)}})),emailContainer.addEventListener("input",(()=>{const e=Array.from(document.querySelectorAll(".email-input")),t=e.filter((e=>""!==e.value.trim())),a=t.map((e=>e.value.trim())),r=new Set(a).size!==a.length;submitBtn.disabled=t.length<2||r,r?(errorMessage.classList.remove("hidden"),e.forEach((e=>{a.filter((t=>t===e.value.trim())).length>1?e.classList.add("border-red-500"):e.classList.remove("border-red-500")}))):(errorMessage.classList.add("hidden"),e.forEach((e=>e.classList.remove("border-red-500"))))})),document.getElementById("santa-form").addEventListener("submit",(async e=>{e.preventDefault();const t=Array.from(document.querySelectorAll(".email-input")),a=t.map((e=>e.value.trim()));(await fetch("http://127.0.0.1:3000/draw/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({emails:a})})).ok?(alert("🎉 Secret Santa draw completed! Emails sent."),t.forEach((e=>e.value=""))):alert("❌ Something went wrong. Please try again!")}));
//# sourceMappingURL=index.d66294d4.js.map