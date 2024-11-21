import { Link } from "react-router-dom";
import axios from "axios";
import { React, useState } from "react";
import Modal from "react-modal";
import "./Menu.css"




function Menu() {

    const [loanModalOpen, setLoanModalOpen] = useState(false);
    const [authorModalOpen, setAuthorModalOpen] = useState(false);
    const [loans, setLoans] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState('');
    const [editAuthorModalOpen, setEditAuthorModalOpen] = useState(false);
    const [authorBeingEdited, setAuthorBeingEdited] = useState(null);

    const handleClickLogout = () => {
        const token = sessionStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/logout/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user_id')
            window.location.reload();
        })
        .catch(error => {
            console.error('Erro: ', error);
        });
    }

    const openEditModal = () => {
        const token = sessionStorage.getItem('token');
        axios.get(
            `http://127.0.0.1:8000/loans/user/${sessionStorage.getItem('user_id')}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
        })
        .then(response => {
            setLoans(response.data);
            setLoanModalOpen(true);
        })
        .catch(error => {
            console.error('Erro no get:', error);
        });
    }

    const closeEditModal = () => {
        setLoanModalOpen(false);
    }

    const deleteLoan = (loanId) => {
        axios.delete(`http://127.0.0.1:8000/loan/${loanId}`)
        .then(response => {
            console.log('Loan deleted:', response);
            openEditModal();
        })
        .catch(error => {
            console.error('Error deleting loan:', error);
        });
    }

    const openAuthorModal = () => {
        axios.get(
            'http://127.0.0.1:8000/author/'
        )
        .then(response => {
            setAuthors(response.data);
            setAuthorModalOpen(true);
        })
        .catch(error => {
            console.error('Erro no get:', error);
        });
    }

    const closeAuthorModal = () => {
        setAuthorModalOpen(false);
    }

    const addAuthor = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/author/', {
            author_name: newAuthor
        })
        .then(response => {
            console.log('Author added:', response);
            openAuthorModal();
        })
        .catch(error => {
            console.error('Error adding author:', error);
        });
    }

    const deleteAuthor = (authorId) => {
        axios.delete(`http://127.0.0.1:8000/author/${authorId}`)
        .then(response => {
            console.log('Author deleted:', response);
            openAuthorModal();
        })
        .catch(error => {
            console.error('Error deleting author:', error);
        });
    }

    const openEditAuthorModal = (author) => {
        setAuthorBeingEdited(author);
        setNewAuthor(author.author_name);
        setEditAuthorModalOpen(true);
    }

    const editAuthor = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/author/${authorBeingEdited.id_author}/`, {
            author_name: newAuthor
        })
        .then(response => {
            console.log('Author edited:', response);
            openAuthorModal();
            setNewAuthor('');
            setEditAuthorModalOpen(false);
        })
        .catch(error => {
            console.error('Error editing author:', error);
        });
    }

    return(
        <div className="links">
            <div className="textNav">
                <Link to="/login">Login</Link> 
                <Link to="/">Home</Link> 
                <Link to="/register">Register</Link>
                <Link to="/newbook">Novo Livro</Link>
            </div>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    </style>
        <div className="botoesNav">
            <button className="loan_button" onClick={openEditModal}>Meus Empréstimos</button>
            <Modal className="empr" isOpen={loanModalOpen} onRequestClose={closeEditModal}>
                <h2 className="emprText">Meus Empréstimos</h2>
                {loans.map(loan => (
                    <div key={loan.id_loan}>
                        <p className="emprText">Book: {loan.book_detail.book_name}</p>
                        <button className="btnEmpr1" onClick={() => deleteLoan(loan.id_loan)}>Delete</button>
                    </div>
                ))}
                <button className="btnEmpr2" onClick={closeEditModal}>Close</button>
            </Modal>
            <button className="author_button" onClick={openAuthorModal}>Autores</button>
            <Modal isOpen={authorModalOpen} onRequestClose={closeAuthorModal}>
                <h2>Autores: </h2>
                <form onSubmit={addAuthor}>
                    <input type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="Nome do Autor: " />
                    <button className="autores" type="submit">Adicionar Autor</button>
                </form>
            
                {authors.map(author => (
                    <div key={author.id_author}>
                        <p>{author.author_name}</p>
                        <button onClick={() => openEditAuthorModal(author)}>Editar</button>
                        <Modal isOpen={editAuthorModalOpen} onRequestClose={() => setEditAuthorModalOpen(false)}>
                            <h2>Edit Author</h2>
                            <form onSubmit={editAuthor}>
                                <input type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="Nome do Autor: " />
                                <button type="submit">Edit Author</button>
                            </form>
                        </Modal>
                        <button className="deletebtn" onClick={() => deleteAuthor(author.id_author)}>Deletar</button>
                        {author.books.map((book, index) => (
                            <div key={index}>
                                <p>{book[0]}</p>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={closeAuthorModal}>Fechar</button>
            </Modal>
            <button className="logout_button" onClick={handleClickLogout}>Sair</button>
        </div>
        </div>
        
    );
}
export default Menu;