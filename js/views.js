var VistaApp = Backbone.View.extend({
	el: '.app',

	initialize: function(){
		servicios.on('add', this.agregando);
		servicios.add(servidorServicios);

	},

	agregando: function(modelo){
		var vista = new VistaServicios({model: modelo});
		$('#lista-servicios').append(vista.$el);
	}
});

var VistaServicios = Backbone.View.extend({
	template: _.template($('#tpl-servicios').html()),

	events: {
		'click #detalle': 'detalleServicio'
	},

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
	},

	detalleServicio: function(){
		var vistaDetalle = new VistaDetalleServicio({model:this.model});
		$('#lista-servicios').html(vistaDetalle.$el);
	}
});

var VistaDetalleServicio = Backbone.View.extend({
	template: _.template($('#tpl-detalle').html()),

	initialize: function(){
		this.render();
	},

	render: function(){

		this.$el.html(this.template(this.model.toJSON()));

		var templateDesign = $('#tpl-design').html();

		if(this.model.get('nombre')=='Diseño Gráfico'){
			$('#contenido-detalle').html(templateDesign);
			console.log(templateDesign);
		}	

		else{
			console.log('no lo hice');
		}
		
	}
});

var vistaPrincipal = new VistaApp();