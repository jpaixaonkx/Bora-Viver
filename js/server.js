// ==========================================================================
// BACKEND SERVER - BORA VIVER TRAVEL (EXPRESS + SUPABASE)
// ==========================================================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa o cliente do Supabase com as variáveis do .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middlewares Globais
app.use(cors());
app.use(express.json());

// CORREÇÃO DE ROTAS ESTÁTICAS: Apontando corretamente para as pastas na raiz
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));

// ==========================================================================
// ROTAS DE PAGINAS (VIEWS)
// ==========================================================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});

app.get('/cliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cliente.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// ==========================================================================
// ROTAS DE API (PROTEGIDAS E INTERMEDIADAS PELO BACKEND)
// ==========================================================================

// Rota de API segura para buscar Voos Ativos
app.get('/api/voos', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('voos')
            .select('*')
            .eq('status', 'ativo');

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar voos no servidor', details: err.message });
    }
});

// Rota de API segura para buscar Promoções
app.get('/api/promocoes', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('configuracoes') // Corrigido para a tabela 'configuracoes' que criamos no SQL unificado
            .select('texto_banner')
            .eq('id', 1)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar promoções', details: err.message });
    }
});

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 SERVIDOR DECOLANDO NA PORTA: ${PORT}`);
    console.log(`🌍 ACESSE EM: http://localhost:${PORT}`);
    console.log(`==================================================`);
});