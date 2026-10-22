const SUPABASE_URL = 'https://xmfhjhjgjjwbvykpedwt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZmhqaGpnamp3YnZ5a3BlZHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2MjYxMzAsImV4cCI6MjEwODIwMjEzMH0.dShcReWq5Qq_3DgM4mopnIP-13xou_B9tdAlYuPRCrk';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('register-form');
const messageElement = document.getElementById('message');

form.addEventListener('submit', async (e) =>{

    e.preventDefault();
    const email = document.getElementById('email').ariaValueMax.trim();

    messageElement.style.color = 'black';
    messageElement.textContent = 'Verificando disponibilidad...';

    try {
    // PASO 1: Consultar si el correo ya existe en la tabla 'usuarios'
    const { data: existingUser, error: checkError } = await supabase
      .from('usuarios')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      throw new Error(`Error en la consulta: ${checkError.message}`);
    }

    // Si existingUser trae datos, significa que el correo ya está registrado
    if (existingUser) {
      messageElement.style.color = 'orange';
      messageElement.textContent = '❌ Este correo ya se encuentra registrado.';
      return; // Detenemos la ejecución
    }

    // PASO 2: Si no existe, procedemos a insertarlo en la base de datos
    messageElement.textContent = 'Registrando usuario...';
    
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert([{ email: email }]);

    if(insertError) {
        throw new Error(`Error al insertar: ${insertError.message}`);
    }
    //probando
    //Existo se registro
    messageElement.style.color = 'green';
    messageElement.textContent = 'Registro completado!';
    form.reset();

  } catch (err) {
    messageElement.style.color = 'red';
    messageElement.textContent = err.message;
  }

});
