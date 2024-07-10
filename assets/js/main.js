// CONST BUTTONS

const dark_mode = document.getElementById('flexSwitchCheckChecked');
const encrypt_btn = document.getElementById('encrypt');
const decrypt_btn = document.getElementById('decrypt');
const copy_btn = document.getElementById('liveToastBtn');

const toastContent = document.getElementById('toast')

// Encrypt | Decrypt - Functions

const inputarea = document.getElementById('input');
const outputarea = document.getElementById('output');
const robot = document.getElementById('robotIcon');
const ready_txt = document.getElementById('textReady')

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

function show_output(text){
    outputarea.innerHTML= text;
    outputarea.style.display = 'block';
    robot.style.display = 'none';
    ready_txt.style.display = 'none';
    copy_btn.style.display = 'inline';
}

function revert(){
    outputarea.innerHTML= '';
    outputarea.style.display = 'none';
    robot.style.display = 'flex';
    ready_txt.style.display = 'block';
    copy_btn.style.display = 'none';
}

function encrypt(){
    if(input.length != 0){
        input_text = input.value.toLowerCase();
        inputarea.value = "";

        let test_txt = /^[a-z\s]+$/;
        encrypted_text = ""

        if(input_text.match(test_txt)){
            for (let char of input_text) {
                if (encrypt_dct[char]) {
                  encrypted_text += encrypt_dct[char];
                } else {
                  encrypted_text += char;
                }
              }
            
            show_output(encrypted_text);
        }
        else{
            revert()
            alert("El texto a encriptar no puede contener números o acentos...")
        }

    } else{
        revert()
        alert("No has introducido un texto que encriptar...")
    }


}

function decrypt(){
    if(input.length != 0){
        input_text = input.value.toLowerCase();
        inputarea.value = "";

        let test_txt = /^[a-z\s]+$/;
        decrypted_text = ""

        if(input_text.match(test_txt)){
            while (input_text.length > 0) {
                let found = false;
                for (let key in decrypt_dct) {
                  if (input_text.startsWith(decrypt_dct[key])) {
                    decrypted_text += key;
                    input_text = input_text.slice(decrypt_dct[key].length);
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  decrypted_text += input_text[0];
                  input_text = input_text.slice(1);
                }
              }
            
              show_output(decrypted_text);
        }
        else{
            revert()
            alert("El texto a desencriptar no puede contener números o acentos...")
        }

    } else{
        revert()
        alert("No has introducido un texto que desencriptar...")
    }
}

function clipboard() {
    navigator.clipboard.writeText(outputarea.innerHTML);
    var toast = new bootstrap.Toast(toastContent)
    toast.show();
    
}

function toggleImages() {
    // Seleccionar todas las imágenes que necesitan cambiar
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // Obtener la ruta actual de la imagen
        let src = img.getAttribute('src');
        
        // Verificar si la imagen es para modo claro (_light) o oscuro (_dark)
        if (src.includes('_light')) {
            if (document.body.classList.contains('dark-mode')) {
                // Cambiar a la versión para modo oscuro (_dark)
                let darkSrc = src.replace('_light', '_dark');
                img.setAttribute('src', darkSrc);
            } else {
                // Cambiar de nuevo a la versión para modo claro (_light)
                let lightSrc = src.replace('_dark', '_light');
                img.setAttribute('src', lightSrc);
            }
        } else if (src.includes('_dark')) {
            if (document.body.classList.contains('dark-mode')) {
                // Mantener la versión para modo oscuro (_dark)
                img.setAttribute('src', src);
            } else {
                // Cambiar de nuevo a la versión para modo claro (_light)
                let lightSrc = src.replace('_dark', '_light');
                img.setAttribute('src', lightSrc);
            }
        }
    });
}


// Events Listeners Decrypt | Encrypt
encrypt_btn.addEventListener('click', encrypt);
decrypt_btn.addEventListener('click', decrypt);
copy_btn.addEventListener('click', clipboard);
dark_mode.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    toggleImages();
});
