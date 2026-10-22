const SUPABASE_URL = "https://kimskdmknfczumircrtd.supabase.co";
const SUPABASE_KEY = "sb_publishable_z7eqI_3OirRCJE8iLrbyvw_41_I72jn";
const supabase_client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const form = document.getElementById("register-form");
const messageElement = document.getElementById("message");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  messageElement.style.color = "black";
  messageElement.textContent = "Registering...";
  const { error } = await supabase_client
    .from("usuarios")
    .insert({ email });

    if (error) {
        if (error.code === '23505') {
            messageElement.style.color = 'red';
            messageElement.textContent = 'Este correo electrónico ya está registrado.';
        }
        else {
            messageElement.textContent = `Error: ${error.message}`;
        }
    }

    messageElement.style.color = 'pink';
    messageElement.textContent = '¡Registro exitoso!';
    form.reset();
}
)