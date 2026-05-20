// Script para verificar que las variables de entorno están configuradas correctamente
import { readFileSync } from 'fs';

console.log('🔍 Verificando configuración de variables de entorno...\n');

// Leer .env.local
const envContent = readFileSync('.env.local', 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

const checks = {
  'RESEND_API_KEY': {
    value: envVars.RESEND_API_KEY,
    valid: envVars.RESEND_API_KEY?.startsWith('re_'),
    message: 'API Key de Resend'
  },
  'PELUQUERO_EMAIL': {
    value: envVars.PELUQUERO_EMAIL,
    valid: envVars.PELUQUERO_EMAIL?.includes('@'),
    message: 'Email del peluquero'
  },
  'VITE_SUPABASE_URL': {
    value: envVars.VITE_SUPABASE_URL,
    valid: envVars.VITE_SUPABASE_URL?.startsWith('https://'),
    message: 'URL de Supabase'
  },
  'VITE_SUPABASE_ANON_KEY': {
    value: envVars.VITE_SUPABASE_ANON_KEY,
    valid: envVars.VITE_SUPABASE_ANON_KEY?.startsWith('eyJ'),
    message: 'Anon Key de Supabase'
  }
};

let allPassed = true;

Object.entries(checks).forEach(([name, check]) => {
  const status = check.valid ? '✅' : '❌';

  if (check.valid) {
    console.log(`${status} ${name}: Configurada correctamente`);
  } else {
    console.log(`${status} ${name}: ${check.value ? 'Formato inválido' : 'NO configurada'}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('🎉 ¡Todas las variables están configuradas correctamente!');
  console.log('\n📧 Email del peluquero:', envVars.PELUQUERO_EMAIL);
  console.log('🔑 Resend API Key:', envVars.RESEND_API_KEY?.substring(0, 15) + '...');
  console.log('\n✨ Listo para hacer una reserva de prueba');
  console.log('\n📝 Próximos pasos:');
  console.log('   1. npm run dev');
  console.log('   2. Ir a http://localhost:3000');
  console.log('   3. Hacer una reserva de prueba');
  console.log('   4. Verificar que llegas los 2 emails');
} else {
  console.log('❌ Hay variables sin configurar. Revisa .env.local');
  process.exit(1);
}
