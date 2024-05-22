// une chose
export default class Livre {

    // Un livre est caractérisé par un id, un titre, une qte en stock et un prix
    constructor(id, titre, qteEnStock, prix) {
        this._id = id;
        this._titre = titre;
        this._qteEnStock = qteEnStock;
        this._prix = prix;
        // this._id = Date.now() + Math.floor(Math.random() * 10); // génération d'un id unique
    }

    get titre() {
        return this._titre;
    }

    get qteEnStock() {
        return this._qteEnStock;
    }

    get id() {
        return this._id;
    }

    get prix() {
        return this._prix;
    }

    // ajouter 1 à la quantité en stock d'un livre
    addOneBook() {
        this._qteEnStock = this._qteEnStock + 1;
    }

    // retirer 1 à la quantité en stock d'un livre
    removeOneBook() {
        this._qteEnStock = this._qteEnStock - 1;
    }

    // modifier le texte
    set texte(texte) {
        this._texte = texte;
    }

    pourAfficher() {
        return `-->  Titre [${this._titre}] Quantité en stock [${this._qteEnStock}] Prix : ${this._prix} €  ID ${this._id}`;
    }

    AfficherTitre() {
        return `${this._titre}`;
    }

    AfficherPrix() {
        return `${this._prix} $MXN`;
    }

    AfficherQteEnStock() {
        return `${this._qteEnStock}`;
    }

    AfficherId() {
        return `${this._id}`;
    }
}
