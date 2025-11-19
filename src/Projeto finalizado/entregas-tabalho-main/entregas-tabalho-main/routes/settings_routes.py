from flask import Blueprint, request, jsonify
from models import db
from models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity

settings_bp = Blueprint("settings", __name__, url_prefix="/settings")


# Modelo simplificado (ideal mover para models/empresa.py)
class EmpresaConfig(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_empresa = db.Column(db.String(120))
    cnpj = db.Column(db.String(30))
    email = db.Column(db.String(120))
    telefone = db.Column(db.String(30))


# --- SALVAR DADOS DA EMPRESA ---
@settings_bp.route('/api/empresa', methods=['POST'])
def salvar_empresa():
    data = request.get_json()

    if not data:
        return jsonify({"msg": "JSON inválido"}), 400

    empresa = EmpresaConfig.query.get(1)

    if not empresa:
        empresa = EmpresaConfig(id=1)

    empresa.nome_empresa = data.get("nomeEmpresa")
    empresa.cnpj = data.get("cnpj")
    empresa.email = data.get("email")
    empresa.telefone = data.get("telefone")

    db.session.add(empresa)
    db.session.commit()

    return jsonify({"msg": "Dados atualizados com sucesso"}), 200


# --- ATUALIZAR SENHA ---
@settings_bp.route('/update_password', methods=['POST'])
@jwt_required()
def update_password():
    data = request.get_json() or {}
    nova_senha = data.get("novaSenha")

    if not nova_senha:
        return jsonify({"msg": "Senha não enviada"}), 400

    user_identity = get_jwt_identity()
    user = User.query.filter_by(username=user_identity["username"]).first()

    if not user:
        return jsonify({"msg": "Usuário não encontrado"}), 404

    user.set_password(nova_senha)
    db.session.commit()

    return jsonify({"msg": "Senha atualizada com sucesso"}), 200
