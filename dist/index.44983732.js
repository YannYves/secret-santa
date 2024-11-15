const emailContainer = document.getElementById('email-container');
const addEmailBtn = document.getElementById('add-email-btn');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const maxEmails = 30;
addEmailBtn.addEventListener('click', ()=>{
    if (emailContainer.children.length < maxEmails) {
        const input = document.createElement('input');
        input.type = 'email';
        input.name = 'emails[]';
        input.placeholder = 'Enter email address';
        input.required = true;
        input.classList.add('email-input', 'w-full', 'border', 'border-gray-300', 'p-2', 'rounded');
        emailContainer.appendChild(input);
    }
});
emailContainer.addEventListener('input', ()=>{
    const emailInputs = Array.from(document.querySelectorAll('.email-input'));
    const filledEmails = emailInputs.filter((input)=>input.value.trim() !== '');
    const emailValues = filledEmails.map((input)=>input.value.trim());
    const hasDuplicates = new Set(emailValues).size !== emailValues.length;
    submitBtn.disabled = filledEmails.length < 2 || hasDuplicates;
    if (hasDuplicates) {
        errorMessage.classList.remove('hidden');
        emailInputs.forEach((input)=>{
            if (emailValues.filter((email)=>email === input.value.trim()).length > 1) input.classList.add('border-red-500');
            else input.classList.remove('border-red-500');
        });
    } else {
        errorMessage.classList.add('hidden');
        emailInputs.forEach((input)=>input.classList.remove('border-red-500'));
    }
});
document.getElementById('santa-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const emailInputs = Array.from(document.querySelectorAll('.email-input'));
    const emails = emailInputs.map((input)=>input.value.trim());
    const response = await fetch('http://127.0.0.1:3000/draw/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emails
        })
    });
    if (response.ok) {
        alert("\uD83C\uDF89 Secret Santa draw completed! Emails sent.");
        emailInputs.forEach((input)=>input.value = '');
    } else alert("\u274C Something went wrong. Please try again!");
});

//# sourceMappingURL=index.44983732.js.map
