// CONST BUTTONS

const dark_mode = document.getElementById('flexSwitchCheckChecked');
const encrypt_btn = document.getElementById('encrypt');
const decrypt_btn = document.getElementById('decrypt');
const copy_btns = document.querySelectorAll('.copy-btn');

const toastContent = document.getElementById('toast')

// Encrypt | Decrypt - Functions

const inputareas = Array.from(document.querySelectorAll('.input-area'));
const outputareas = Array.from(document.querySelectorAll('.output-area'));
const robots = document.querySelectorAll('.robot-icon');
const ready_txts = document.querySelectorAll('.text-ready');

// Dictionarys
let encrypt_dct = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat' 
  }
  
  let decrypt_dct = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
}

// Functions

function show_output(text) {
    for(var index = 0; index <2; index++) {
        outputareas[index].innerHTML = text;
        outputareas[index].style.display = 'block';
        robots[index].style.display = 'none';
        ready_txts[index].style.display = 'none';
        copy_btns[index].style.display = 'inline';
    };
}

function revert() {
    for(var index =0; index<2; index++){
        outputareas[index].innerHTML = '';
        outputareas[index].style.display = 'none';
        robots[index].style.display = 'flex';
        ready_txts[index].style.display = 'block';
        copy_btns[index].style.display = 'none';
    }
    
}

function encrypt() {
    const inputareaWithText = inputareas.find(inputarea => inputarea.value.trim() !== "");

    if(inputareaWithText){
        let input_text = inputareaWithText.value.toLowerCase();
        inputareaWithText.value = "";

        let encrypted_txt = "";
        const test_txt = /^[a-z\s]+$/;
        if(test_txt.test(input_text)){
            for(var char of input_text){
                if(encrypt_dct[char]){
                    encrypted_txt += encrypt_dct[char];
                }else{
                    encrypted_txt += char;
                }
            }
            show_output(encrypted_txt);
        } else{
            alert("El texto no puede contener números ni caracteres especiales...")
            revert();
        }
    } else{
        alert("Añade un texto para encriptar...")
        revert();
    }
}


function decrypt() {
    const inputareaWithText = inputareas.find(inputarea => inputarea.value.trim() !== "");

    if(inputareaWithText){
        let input_text = inputareaWithText.value.toLowerCase();
        inputareaWithText.value = "";

        let decrypted_txt = "";
        const test_txt = /^[a-z\s]+$/;
        if(test_txt.test(input_text)){
            while(input_text.length > 0){
                let found = false;
                for(let key in decrypt_dct){
                    if(input_text.startsWith(key)){
                        decrypted_txt += decrypt_dct[key];
                        input_text = input_text.slice(key.length)
                        found = true;
                        break;
                    }
                }
                if(!found){
                    decrypted_txt += input_text[0];
                    input_text = input_text.slice(1);
                }
            }
            show_output(decrypted_txt);
        } else {
            alert("El texto no puede contener números ni caracteres especiales...")
            revert();
        }
    } else {
        alert("Añade un texto para desencriptar...")
        revert();
    }
}

function clipboard(index) {
    navigator.clipboard.writeText(outputareas[index].innerHTML);
    var toast = new bootstrap.Toast(toastContent);
    toast.show();
}

function toggleImages() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        let src = img.getAttribute('src');

        if (document.body.classList.contains('dark-mode')) {
            if (src.includes('_light')) {
                let darkSrc = src.replace('_light', '_dark');
                img.setAttribute('src', darkSrc);
            }
        } else {
            if (src.includes('_dark')) {
                let lightSrc = src.replace('_dark', '_light');
                img.setAttribute('src', lightSrc);
            }
        }
    });
}


// Events Listeners Decrypt | Encrypt
encrypt_btn.addEventListener('click', encrypt);
decrypt_btn.addEventListener('click', decrypt);
copy_btns.forEach((btn, index) => {
    btn.addEventListener('click', () => clipboard(index));
});
dark_mode.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    toggleImages();
});
