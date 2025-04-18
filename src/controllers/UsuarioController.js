import { z } from "zod";

// Schema de validação com Zod
const UsuarioSchema = z.object({
    usu_codigo: z.string().uuid({ message: "Código do usuário inválido" }),
    usu_nome: z.string().min(1, "Nome é obrigatório"),
    usu_telefone: z.string().min(1, "Telefone é obrigatório"),
    usu_email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    usu_senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const UsuarioController = {
    // Criar um novo usuário
    async createUsuario(req, res) {
        try {
            const { usu_codigo, usu_nome, usu_telefone, usu_email, usu_senha } = req.body;

            UsuarioSchema.parse({ usu_codigo, usu_nome, usu_telefone, usu_email, usu_senha });

            res.status(201).json({ message: "Usuário criado com sucesso" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors.map(err => ({
                        atributo: err.path[0],
                        message: err.message,
                    })),
                });
            }
            res.status(500).json({ message: error.message });
        }
    },

    // Atualizar um usuário existente
    async updateUsuario(req, res) {
        try {
            const { id } = req.params;
            const { usu_codigo, usu_nome, usu_telefone, usu_email, usu_senha } = req.body;

            UsuarioSchema.parse({ usu_codigo, usu_nome, usu_telefone, usu_email, usu_senha });

            res.status(200).json({ message: "Usuário atualizado com sucesso" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    details: error.errors,
                });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async deleteUsuario(req, res) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            await usuario.destroy();

            res.status(200).json({ message: "Usuário deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },      

    async getAllUsuarios(req, res) {
        try {
            const data = [
                {
                    usu_codigo: "12345678-1234-1234-1234-123456789012",
                    usu_nome: "João Silva",
                    usu_telefone: "123456789",
                    usu_email: "joao.silva@example.com",
                },
                {
                    usu_codigo: "87654321-4321-4321-4321-210987654321",
                    usu_nome: "Maria Souza",
                    usu_telefone: "987654321",
                    usu_email: "maria.souza@example.com",
                }
            ];
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default UsuarioController;
