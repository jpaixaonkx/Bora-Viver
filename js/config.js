// js/config.js

// Credenciais do seu novo projeto Supabase
const SUPABASE_URL = "https://uwslswyfgldimziklonb.supabase.co";
const SUPABASE_KEY = "sb_publishable_wPdVmvf5EzMGCXrjMt0eDQ_qF62zpgS";

// Cria a instância global de forma segura
if (typeof window.supabase !== 'undefined') {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("🚀 Supabase inicializado com sucesso via config.js!");
} else {
    console.error("❌ Erro: O script CDN do Supabase precisa ser carregado ANTES do config.js no HTML.");
}