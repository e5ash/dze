class Popidze {
	constructor(options = {
		sep: {
			elem: '__',
			mode: '--'
		},
		name: {
			block: 'popidze',
			inner: 'inner',
			controls: 'controls',
			controlPrev: 'control-prev',
			controlNext: 'control-next',
			item: 'item',
			img: 'img',
			bg: 'bg'
		},
		class: {
			show: 'show',
			hasElement: 'has-element',
			hasImg: 'has-img',
			hasVideo: 'has-video',
		},
		controls: {
			prev: '←',
			next: '→'
		},
		attr: {
			parse: 'popidze'
		},
		btns: {
			show:  '.popidze-show, [data-popidze]',
			close: '.popidze-close, [data-popidze-close]'
		}
	}) {
		this.options = options;
		this.btns = {
			show:  document.querySelectorAll(this.options.btns.show),
			close: document.querySelectorAll(this.options.btns.close)
		};
		this.createElements();

		if (this.btns.show) {
			this.btns.show.forEach((btn)=>{
				btn.popidzeSrc  = btn.dataset[this.options.attr.parse] ? btn.dataset[this.options.attr.parse] : btn.getAttribute('href');
				btn.popidzeIsImage = btn.popidzeSrc.match(/\.jpg$|\.jpeg$|\.png$/) ? true : false;
				if (btn.popidzeIsImage) {
					btn.popidzeEl = this.createElement('img', this.options.name.img, false, true);
					btn.popidzeEl.src = btn.popidzeSrc;
				} else {
					btn.popidzeEl = document.querySelector(btn.popidzeSrc);
				}
				
				btn.addEventListener('click', (event)=>{
					event.preventDefault();
					this.show(btn.popidzeEl);
				});
			});
		}

		this.bg.addEventListener('click', ()=>{
			this.close();
		});
	}
	createElements() {
		this.block  = this.createElement('div', this.options.name.block, document.body, false);
		this.inner  = this.createElement('div', this.options.name.inner, this.block);
		this.bg  = this.createElement('div', this.options.name.bg, this.block);

		this.controls  = this.createElement('div', this.options.name.controls, this.block);
		this.controls.prev  = this.createElement('div', this.options.name.controlPrev, this.controls);
		this.controls.prev.innerHTML = this.options.controls.prev;
		this.controls.next  = this.createElement('div', this.options.name.controlNext, this.controls);
		this.controls.next.innerHTML = this.options.controls.next;
	}
	createElement(tag, cls, appendEl, child = true) {
		let el = document.createElement(tag);
		el.className = child ? this.options.name.block + this.options.sep.elem + cls : cls;
		if (appendEl) {
			appendEl.append(el);
		}
		return el;
	}
	show(el, callback) {
		this.el = el;

		this.addClass(this.el, this.options.name.item);

		this.inner.append(this.el);
		this.addClass(this.block, this.options.class.show, 1);
	}
	close() {
		this.removeClass(this.el, this.options.name.item);
		document.body.append(this.el);
		this.removeClass(this.block, this.options.class.show, 1);
	}
	addClass(el, cls, type = 0) {
		let c = '';
		switch (type) {
			case 0:
				c = this.options.name.block + this.options.sep.elem + cls;
				break;
			case 1:
				c = this.options.sep.mode + cls;
				break;
		}
		el.classList.add(c);
	}
	removeClass(el, cls, type = 0) {
		let c = '';
		switch (type) {
			case 0:
				c = this.options.name.block + this.options.sep.elem + cls;
				break;
			case 1:
				c = this.options.sep.mode + cls;
				break;
		}
		el.classList.remove(c);
	}
}