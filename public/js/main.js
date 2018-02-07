+function($) {
    $(function() {

        const newsScraper = {
            init () {
                this.domCaching();
                this.eventBinding();
            },
            domCaching () {
                this.divMyAlert = $('#myAlerts');
                this.articleOptions = $('.article-options');
                this.commentModal = $('#commentModal');
                this.commentForm = $('#commentForm');
            },
            eventBinding () {
                this.articleOptions.on('click', '.fa-bookmark', this.saveArticle.bind(this));
                // this.articleOptions.on('click', '.fa-trash-alt', this.removeArticle.bind(this));
                this.commentModal.on('show.bs.modal', this.commentModalFn.bind(this));
            },
            saveArticle (e) {
                let clickedItem = $(e.target);
                let parentEl = $(e.target.closest('.card[data-dbid]'));
                let articleID = parentEl.attr('data-dbid');
                
                $.ajax({
                    type: 'PUT',
                    url: `/save/${articleID}`,
                    success: response => {
                        this.createAlert("success", "Article saved!");
                        this.removeAlert();
                        console.log("yes I saved it");
                        // location.reload();
                    },
                    error: () => {
                        this.createAlert("danger", "There was an error with your request, please try again");
                        this.removeAlert();
                    }
                });
            },
            createAlert (type, message) {
                let alertHTML = 
                $(`
                    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            this.divMyAlert.append(alertHTML);
            },
            removeAlert () {
                setTimeout( () => { this.divMyAlert.empty() }, 3000);
            },
            commentModalFn (e) {
                
                const button = $(e.relatedTarget); // Btn that triggered the modal
                const docID = button.data('dbid') // Extract info from data-* attributes
 
                // Update the modal's content
                this.commentForm.attr("action", `/save/comment/${docID}`);
            }
        }

        newsScraper.init();
    });
}(jQuery)