/// <reference types="cypress"/>

import tokenFixture from '../../fixtures/token.json'
import productReviewFixture from '../../fixtures/productReview.json'
import statusFixture from '../../fixtures/status.json'
import productReviewContract from '../../contract/productReviewContract'
import productReviewEditar from '../../contract/productReviewEditar'
import productReviewDeletar from '../../contract/productReviewDeletar'
import { faker } from '@faker-js/faker'


describe('Desafio API Product Review', () => {  
   it('Criar Product Review - (POST) - Aceitação', () => {        
        const reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token, 
            productReviewFixture.productReviewCriar.product_id,
            productReviewFixture.productReviewCriar.review,
            productReviewFixture.productReviewCriar.reviewer,       
            reviewer_email,                        
            productReviewFixture.productReviewCriar.rating
        ).then((response) =>{
            const {product_id, review, reviewer, reviewer_email, rating} = response.body
            let id = response.body.id            
            expect(response.status).to.eq(statusFixture.created)
            expect(product_id).to.eq(productReviewFixture.productReviewCriar.product_id)
            expect(review).to.eq(productReviewFixture.productReviewCriar.review)
            expect(reviewer).to.eq(productReviewFixture.productReviewCriar.reviewer)
            expect(reviewer_email).to.eq(reviewer_email)
            expect(rating).to.eq(productReviewFixture.productReviewCriar.rating)                        
        })        
    });
    it('Criar Product Review - (POST) - Contrato', () => {
        const reviewer_email = faker.internet.email()        
        cy.postProductReviewWooCommerce(            
            tokenFixture.token, 
            productReviewFixture.productReviewCriar.product_id,
            productReviewFixture.productReviewCriar.review,
            productReviewFixture.productReviewCriar.reviewer,       
            reviewer_email,                        
            productReviewFixture.productReviewCriar.rating
        ).then((response) =>{                      
            let id = response.body.id    
            return productReviewContract.validateAsync(response.body),
            cy.deleteProductReviewWooCommerce(
                tokenFixture.token,
                id,
                productReviewFixture.productReviewDeletar.force
           )      
        })        
    });
    it('Editar Product Review - (PUT) - Aceitação', () => {
        const review = faker.lorem.sentence()
        const reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token, 
            productReviewFixture.productReviewCriar.product_id,
            review,
            productReviewFixture.productReviewCriar.reviewer,       
            reviewer_email,                        
            productReviewFixture.productReviewCriar.rating
        ).then((response) =>{
        const reviewEditar = faker.lorem.sentence()
        const reviewer_emailEditar = faker.internet.email()
        let id = response.body.id
        cy.putProductReviewWooCommerce(
            tokenFixture.token, 
            productReviewFixture.productReviewEditar.product_id,
            reviewEditar,
            productReviewFixture.productReviewEditar.reviewer,       
            reviewer_emailEditar,                        
            productReviewFixture.productReviewEditar.rating,
            id
        ).then((response) =>{
            const {product_id, review, reviewer, reviewer_email, rating} = response.body
            expect(response.status).to.eq(statusFixture.ok)
            expect(product_id).to.eq(productReviewFixture.productReviewEditar.product_id)
            expect(review).to.eq(reviewEditar)
            expect(reviewer).to.eq(productReviewFixture.productReviewEditar.reviewer)
            expect(reviewer_email).to.eq(reviewer_emailEditar)
            expect(rating).to.eq(productReviewFixture.productReviewEditar.rating)            
         })
       })
    });
    it('Editar Product Review - (PUT) - Contrato', () => {
        const review = faker.lorem.sentence()
        const reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token, 
            productReviewFixture.productReviewCriar.product_id,
            review,
            productReviewFixture.productReviewCriar.reviewer,       
            reviewer_email,                        
            productReviewFixture.productReviewCriar.rating
        ).then((response) =>{
            const reviewEditar = faker.lorem.sentence()
            const reviewer_emailEditar = faker.internet.email()
            let id = response.body.id
        cy.putProductReviewWooCommerce(
            tokenFixture.token, 
            productReviewFixture.productReviewEditar.product_id,
            reviewEditar,
            productReviewFixture.productReviewEditar.reviewer,       
            reviewer_emailEditar,                        
            productReviewFixture.productReviewEditar.rating,
            id
        ).then((response) =>{
        return productReviewEditar.validateAsync(response.body),        
        cy.deleteProductReviewWooCommerce(            
            tokenFixture.token,
            id,
            productReviewFixture.productReviewDeletar.force            
        )        
      })        
     })
   });
    it('Deletar Product Review - (DELETE) - Aceitação', () => {        
        const reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token, 
            productReviewFixture.productReviewCriar.product_id,
            productReviewFixture.productReviewCriar.review,
            productReviewFixture.productReviewCriar.reviewer,       
            reviewer_email,                        
            productReviewFixture.productReviewCriar.rating
        ).then((response) =>{
            let id = response.body.id
            cy.deleteProductReviewWooCommerce(                
                tokenFixture.token,
                id,
                productReviewFixture.productReviewDeletar.force
           ).then((response) =>{
            const {product_id, review, reviewer, reviewer_email, rating} = response.body.previous
            expect(response.status).to.eq(statusFixture.ok)
            expect(product_id).to.eq(productReviewFixture.productReviewCriar.product_id)
            expect(review).to.eq(review)
            expect(reviewer).to.eq(productReviewFixture.productReviewCriar.reviewer)
            expect(reviewer_email).to.eq(reviewer_email)
            expect(rating).to.eq(productReviewFixture.productReviewCriar.rating)                        
         })
      })
   });
   it('Deletar Product Review - (DELETE) - Contrato', () => {
    const reviewer_email = faker.internet.email()       
        cy.postProductReviewWooCommerce(            
            tokenFixture.token, 
            productReviewFixture.productReviewCriar.product_id,
            productReviewFixture.productReviewCriar.review,
            productReviewFixture.productReviewCriar.reviewer,       
            reviewer_email,                        
            productReviewFixture.productReviewCriar.rating
        ).then((response) =>{
            let id = response.body.id
            cy.deleteProductReviewWooCommerce(                
            tokenFixture.token,
            id,
            productReviewFixture.productReviewDeletar.force
            ).then((response)=>{            
            return productReviewDeletar.validateAsync(response.body)
        })                 
      })        
   });
});

