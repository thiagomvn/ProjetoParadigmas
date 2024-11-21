import axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { React, useState, useEffect } from 'react';
import "../routes/Book.css"

function EditBookModal( {book: initialBook, onClose} ) {
    const [book, setBook] = useState(initialBook);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/book/${book.id_book}`)
        .then(response => {
            setBook(response.data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
        axios.get('http://127.0.0.1:8000/author') 
        .then(response => {
            setAuthors(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    if (loading || !book){
        return <div>Carregando...</div>
    }
    
    const initialValues = {
        book_name: book.book_name,
        book_genre: book.book_genre,
        authors: book.authors.map(author => author.id_author),
        book_img: book.book_img,
        num_pages: book.num_pages
      };

      const validation = yup.object().shape({
          book_name: yup.string().required("Campo obrigatório"),
          book_genre: yup.string().required("Campo obrigatório"),
          authors: yup.array().of(yup.string().required("Campo obrigatório")),
          book_img: yup.string().required("Campo obrigatório"),
          num_pages: yup.number().required("Campo obrigatório"),
      });
    
    const handleClickEditBook = (values, { setSubmitting }) => {
        const put_authors = values.authors.map(id_author => {
            const author = authors.find(author => author.id_author === id_author);
            return { id_author, author_name: author.author_name}
        })

        const updatedValues = { ...values, id_book: book.id_book, authors: put_authors, available: book.available, comments: book.comments };

        axios.put(`http://127.0.0.1:8000/book/${book.id_book}/`, updatedValues, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log('Livro editado com sucesso!', response.data);
            setSubmitting(false);
            onClose();
        })
        .catch(error => {
            console.error('Erro: ', error);
            setSubmitting(false);
        });
    };
    return (
        <div>
             <Formik 
            initialValues={initialValues}
            onSubmit={handleClickEditBook}
            validationSchema={validation}>
                {({ }) => (
                    <Form>
                    <div className="">
                        <label for="book_name" className="text-user">Nome do Livro:</label>
                        <Field name="book_name" className="form-field" placeolder="Nome do Livro:" />
                        <ErrorMessage name="book_name" component="span" className="form-error"/>
                    </div>
                    <div className="">
                        <label for="book_genre" className="text-user">Gênero:</label>
                        <Field name="book_genre" className="form-field" placeHolder="Gênero:" />
                        <ErrorMessage name="book_genre" component="span" className="form-error"/>
                    </div>
                    <FieldArray name="authors">
                        {({ form: { setFieldValue, values } }) => (
                            <div className="">
                                <label htmlFor="authors" className="text-user">Autores:</label>
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    authors.map((author) => {
                                        return (
                                            <div className="form-checkbox" key={author.id_author}>
                                                <label>
                                                    <Field
                                                        type="checkbox"
                                                        name="authors"
                                                        value={author.id_author}
                                                    />
                                                    {author.author_name}
                                                </label>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        )}
                    </FieldArray>
                    <div className="">
                        <label for="book_img" className="text-user">Imagem:</label>
                        <Field name="book_img" className="form-field" placeHolder="Imagem:" />
                        <ErrorMessage name="book_img" component="span" className="form-error"/>
                    </div>
                    <div className="">
                        <label htmlFor="num_pages" className="text-user">Número de Páginas:</label>
                        <Field name="num_pages" type="number" className="form-field" placeholder="Número de Páginas:" />
                        <ErrorMessage name="num_pages" component="span" className="form-error"/>
                    </div>
                    <button className="button" type='submit'>Cadastrar</button>
                </Form>
                )}
            </Formik>
        </div>
    )
}
export default EditBookModal