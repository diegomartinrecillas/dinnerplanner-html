"use strict";

export default class MyDinnerView {
	/**
	 * @param {JQuery<HTMLElement>} container
	 * @param {DinnerModel} model
	 */
	constructor(container, model) {
		this.container = container;
		this.model = model;
	}

	render() {
		this.container.html(/*template*/ `
			<div class="dp-myDinner">
				<div class="dp-myDinner__line">
                    <div class="dp-myDinner__picContain">
                        <img src="images/lasagne-sideshot-1-lowres.jpg" class="dp-myDinner__image"/>
                    </div>
                    <div class="dp-myDinner__dinnerDetails">
                        <h3>Lasagne</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. </p>
                    </div>
                    <div class="dp-myDinner__dinnerDiscription">
                        <h4>Preparation</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                   commodo consequat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                    </div>
                </div>
                <div class="dp-myDinner__line">
                    <div class="dp-myDinner__picContain">
                        <img src="images/lasagne-sideshot-1-lowres.jpg" class="dp-myDinner__image"/>
                    </div>
                    <div class="dp-myDinner__dinnerDetails">
                        <h3>Lasagne</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. </p>
                        <!-- <div class="dp-myDinner__dishName">
                            <h3>Lasagne</h3>
                        </div>
                        <div class="dp-myDinner__dishDetails">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. </p>
                        </div> -->
                    </div>
                    <div class="dp-myDinner__dinnerDiscription">
                        <h4>Preparation</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                   commodo consequat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                    </div>
                </div>
			</div>
		`);
	}

	afterRender() {
		// do stuff that require the view to be loaded here
	}
}