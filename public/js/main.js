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
            },
            eventBinding () {
                this.articleOptions.on('click', '.fa-bookmark', this.saveArticle.bind(this) );
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
            }
        }

        newsScraper.init();
    });
}(jQuery)