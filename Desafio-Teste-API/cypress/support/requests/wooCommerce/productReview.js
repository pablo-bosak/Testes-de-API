const basePath = Cypress.env("wooCommerce") + Cypress.env("productReview")


Cypress.Commands.add("getProductReviewWooCommerce", function (token) {
    cy.request({
        method:"GET",
        url: basePath,
        headers:{
            Authorization: token
        }        
    })
})

Cypress.Commands.add("postProductReviewWooCommerce", function(token, product_id, review, reviewer, reviewer_email, rating){
    cy.request({
        method:"POST",
        url:basePath,
        headers:{
            Authorization: token,
        },
        body: {
            "product_id": product_id,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewer_email,
            "rating": rating,
        }
    })
})

Cypress.Commands.add("putProductReviewWooCommerce", function(token, product_id, review, reviewer, reviewer_email, rating, id){
    cy.request({
        method:"PUT",
        url:basePath + "/" + id,
        headers:{
            Authorization: token,
        },
        body: {
            "product_id": product_id,
            "review": review,
            "amount": reviewer,
            "reviewer_email": reviewer_email,
            "rating": rating,        
        }
    })
})

Cypress.Commands.add("deleteProductReviewWooCommerce", function(token, id, force){
    cy.request({
        method:"DELETE",
        url:basePath + "/" + id + "?force=" + force,
        headers:{
            Authorization: token
        }        
    })
})

