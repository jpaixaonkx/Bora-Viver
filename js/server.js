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

// Servir arquivos estáticos (CSS, JS, Imagens, Modelos 3D)
// Certifique-se de que suas pastas 'css', 'js' e 'public' estão na raiz ou ajuste os caminhos abaixo
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ==========================================================================
// ROTAS DE PAGINAS (VIEWS)
// ==========================================================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/cliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cliente.html'));
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
            .from('promocoes')
            .select('*')
            .order('created_at', { ascending: false });

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