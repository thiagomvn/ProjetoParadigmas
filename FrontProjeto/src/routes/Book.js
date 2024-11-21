import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditBookModal from '../components/EditBookModal';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Modal from "react-modal";
import './Book.css';

function Book() {
    const { id_book } = useParams();
    const [book, setBook] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editCommentModalOpen, setEditCommentModalOpen] = useState(false);
    const [commentBeingEdited, setCommentBeingEdited] = useState(null);
    const [newContent, setNewContent] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/book/${id_book}`)
          .then(response => {
            setBook(response.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });

      }, [id_book]);

    if (!book || !book.comments){
        return <div>Carregando...</div>
    }

    const handleClickLoan = () => {
        const token = sessionStorage.getItem('token');
        const user_id = sessionStorage.getItem('user_id');

        if (user_id){
            if (book.available){
                axios.post('http://127.0.0.1:8000/loan/', {
                    book: book.id_book,
                    user: user_id
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log('Livro alugado com sucesso!', response);
                })
                .catch(error => {
                    console.error('Erro: ', error);
                });
            } else {
                alert('Livro indisponível para aluguel!');
            }
        } else {
            alert('Você precisa estar logado para alugar um livro!');
        }
        }

    const openEditModal = () => {
        setEditModalOpen(true);
    }

    const closeEditModal = () => {
        setEditModalOpen(false);
        window.location.reload();
    }

    const handleClickDelete = () => {
        const user_id = sessionStorage.getItem('user_id');

        if (user_id){
            axios.delete(`http://127.0.0.1:8000/book/${book.id_book}/`)
            .then(response => {
                console.log('Livro excluído com sucesso!', response);
            })
            .catch(error => {
                console.error('Erro: ', error);
            });
            navigate('/');
        } else {
            alert('Você precisa estar logado para excluir um livro!');
        }
    }

    const handleClickNewComment = ( values ) => {
        const user_id = sessionStorage.getItem('user_id');
    
        if (user_id && values && typeof values.content !== 'undefined'){
            const payload = {
                user: user_id,
                book: id_book,
                content: values.content
            };
    
            axios.post('http://127.0.0.1:8000/comment/', payload)
            .then(response => {
                console.log('Comentário cadastrado com sucesso!', response);
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro: ', error);
            });
        } else {
            alert('Você precisa estar logado para comentar!');
        }
    }

    const openEditCommentModal = (comment) => {
        setCommentBeingEdited(comment);
        setNewContent(comment.content);
        setEditCommentModalOpen(true);
    }

    const deleteComment = (commentId) => {
        axios.delete(`http://127.0.0.1:8000/comment/${commentId}/`)
        .then(response => {
            console.log('Comentário excluído com sucesso!', response);
            window.location.reload();
        })
        .catch(error => {
            console.error('Erro: ', error);
        });
    }

    const editComment = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/comment-content/${commentBeingEdited.id_comment}/`, {
            content: newContent
        })
        .then(response => {
            console.log('Comment edited:', response);
            setEditCommentModalOpen(false);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error editing comment:', error);
        });
    }

    return (
        <div className='main_containerDetail'>
            <div className='books_container'>
                <img className="imagemLivro" src={book.book_img} />
                <h1 className='bookname'>{book.book_name}</h1>
               
                <p className='pBook'>Autores:
                    {book.authors.map(author => (
                        <div key={author.id_author}>
                            {author.author_name}
                        </div>
                    ))}
                </p>
                <p className='pBook'>Gênero: {book.book_genre}</p>
                <p className='pBook'>Páginas: {book.num_pages}</p>
                <p className='pBook'>Disponibilidade: {book.available ? 'Disponível' : 'Indisponível'}</p>
                
            </div>
            <div className='buttonsBook'>
                <button onClick={handleClickLoan} className='button'>Alugar</button>
                <button onClick={openEditModal} className='button'>Editar</button>
                <button onClick={handleClickDelete} className='button'>Excluir</button>
            </div>
            {editModalOpen && <EditBookModal book={book} onClose={closeEditModal} />}
            <div className='comments_container'>
                <h1>Comentários</h1>
                <Formik 
                    initialValues={{ content: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        handleClickNewComment(values);
                        setSubmitting(false)
                    }}
                >
                    <Form className='comentarioForm'>
                        <div>
                            <label htmlFor="content" className="textUser">Comentário:</label>
                            <Field name="content" className="form-field" placeholder="Comentário:" />
                            <ErrorMessage name="content" component="span" className="form-error"/>
                        </div>
                        <button type="submit" className="buttonComent">Comentar</button>
                    </Form>
                </Formik>
                {book.comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.content}</p>
                        <p>Por: {comment.username}</p>
                        {comment.user === Number(sessionStorage.getItem('user_id')) && (
                            <>
                                <button onClick={() => openEditCommentModal(comment)}>Edit</button>
                                <button onClick={() => deleteComment(comment.id_comment)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
                <Modal isOpen={editCommentModalOpen} onRequestClose={() => setEditCommentModalOpen(false)}>
                    <h1>Seu Comentário:</h1>
                    <form onSubmit={editComment}>
                        <textarea 
                            key={commentBeingEdited ? commentBeingEdited.id_comment : ''}
                            defaultValue={commentBeingEdited ? commentBeingEdited.content : ''}
                            onChange={e => setNewContent(e.target.value)} 
                            placeholder="Comentário:"
                        />
                        <button type="submit">Editar Comentário</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default Book;
