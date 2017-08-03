$(function(){
    var data = [{"empresa":"curabitur","produto":"ut","quantidade":43,"vVarejo":14.4,"vAtacado":2.3,"tipo":"atacado","total":0,"operacoes":"multi"},{"empresa":"imperdiet","produto":"ante","quantidade":54,"vVarejo":7.3,"vAtacado":5.6,"tipo":"varejo","total":0,"operacoes":"multi"},{"empresa":"laoreet","produto":"fringilla","quantidade":23,"vVarejo":8.9,"vAtacado":3.6,"tipo":"atacado","total":0,"operacoes":"sum"},{"empresa":"integer","produto":"fringilla","quantidade":241,"vVarejo":14.5,"vAtacado":7.5,"tipo":"varejo","total":0,"operacoes":"sum"},{"empresa":"at","produto":"aptent","quantidade":24,"vVarejo":7.9,"vAtacado":9.1,"tipo":"varejo","total":0,"operacoes":"sum"},{"empresa":"elementum","produto":"vestibulum","quantidade":187,"vVarejo":6.7,"vAtacado":7.5,"tipo":"atacado","total":0,"operacoes":"sum"},{"empresa":"iaculis","produto":"cras","quantidade":62,"vVarejo":8.5,"vAtacado":8.6,"tipo":"atacado","total":0,"operacoes":"sum"},{"empresa":"mattis","produto":"morbi","quantidade":172,"vVarejo":9.9,"vAtacado":2.6,"tipo":"atacado","total":0,"operacoes":"sum"},{"empresa":"nullam","produto":"praesent","quantidade":117,"vVarejo":18.5,"vAtacado":18.8,"tipo":"varejo","total":0,"operacoes":"sum"},{"empresa":"semper","produto":"suspendisse","quantidade":229,"vVarejo":7.4,"vAtacado":9.8,"tipo":"varejo","total":0,"operacoes":"sum"},{"empresa":"nisl","produto":"posuere","quantidade":25,"vVarejo":4.3,"vAtacado":8.3,"tipo":"varejo","total":0,"operacoes":"multi"},{"empresa":"ullamcorper","produto":"auctor","quantidade":192,"vVarejo":3.2,"vAtacado":1.3,"tipo":"varejo","total":0,"operacoes":"multi"},{"empresa":"tempus","produto":"molestie","quantidade":232,"vVarejo":4.4,"vAtacado":17.1,"tipo":"varejo","total":0,"operacoes":"multi"},{"empresa":"rhoncus","produto":"augue","quantidade":187,"vVarejo":15.4,"vAtacado":0.6,"tipo":"varejo","total":0,"operacoes":"multi"},{"empresa":"venenatis","produto":"sollicitudin","quantidade":156,"vVarejo":2.8,"vAtacado":10.8,"tipo":"atacado","total":0,"operacoes":"sum"},{"empresa":"cursus","produto":"per","quantidade":90,"vVarejo":4.5,"vAtacado":1.4,"tipo":"atacado","total":0,"operacoes":"sum"},{"empresa":"tincidunt","produto":"proin","quantidade":26,"vVarejo":17.4,"vAtacado":11.2,"tipo":"atacado","total":0,"operacoes":"sum"},{"empresa":"tincidunt","produto":"aptent","quantidade":86,"vVarejo":2.8,"vAtacado":11.1,"tipo":"atacado","total":0,"operacoes":"sum"}];
    
    var dataModel = {
        //location: "remote",
        //sorting: "remote",
        data: data,
        location: "local",
        sorting: "local",
        //dataType: "JSON",
        //method: "GET",
        sortIndx: ["empresa", "produto"],
        sortDir: "down"
        //sortDir: ["up", "down"],
        //url:"http://fsocietycursos.pe.hu/api.php",
        /*getData: function (dataJSON) {
            return { curPage: dataJSON.curPage, totalRecords: dataJSON.totalRecords, data: dataJSON.data };
        }*/
    }

    

    var colModel = [
        {
            dataIndx: "empresa",title:"Empresa", width: 150, dataType:"string", align: 'left', editable: true,
            filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'], style: 'width: 90px;' }
        },
        {
            dataIndx: "produto",title:"Produto", width:150, dataType:"string", align: 'right',
            filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'], style: 'width: 90px;' }
        },
        {
            dataIndx: "quantidade",title:"Quantidade", width: 150, dataType:"integer", align: 'right',
            filter: { type: 'textbox', condition: 'between', listeners: ['keyup'], style: 'width: 50px;'}
        },
        {
            dataIndx: "vVarejo",title:"Varejo", width: 150, dataType:"float", align: 'right', 
            filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'], style: 'width: 50px;'},
            format: '$##,###.00'
        },
        {
            dataIndx: "vAtacado",title:"Atacado", width: 150, dataType:"float", align:"right",
            formula:
                function (ui){                           
                    var rd = ui.rowData; // obtendo a coluna
                    resultado = rd['vVarejo'] - (rd['vVarejo'] * 10 / 100);
                    if(resultado){
                        return parseFloat(resultado.toFixed(2));
                    }else{
                        return ' ';
                    }
                },
            format: '$##,###.00'

        },
        {
            dataIndx: "tipo", title: "Tipo", width: 150, dataType: "string", align: 'right',
            
        },
        {
            dataIndx: "total", title: "Total", maxWidth: 150, align: 'right', dataType: "float",
                formula: function(ui){
                    var rd = ui.rowData;
                    var resultado;
                    if(rd['tipo'] == 'varejo'){
                        resultado = parseFloat(rd['vVarejo'] * rd['quantidade']).toFixed(2);
                    }else if(rd['tipo'] == 'atacado'){
                        resultado = parseFloat(rd['vAtacado'] * rd['quantidade']).toFixed(2);
                    }else{
                        resultado = ' ';
                    }
                    return resultado;
                },
                format: '$##,###.00'
        }
    ];

    var gObj = {
            width: 'flex', height: 400,
            maxWidth: 1000,
            dataModel: dataModel,
            wrap: false,
            hwrap: false,
            //showBottom: false,
            //collapsible:true,
            colModel: colModel,              
            title: "Tabela de Produtos e Valores",
            resizable: true,
            filterModel: { on: true, header: true },
            columnBorders: true,
            virtualX: true, virtualY: true,
            freezeCols: 2,
            toolbar:{
				items:[
					{
						type:'button',
						label: 'Toggle filter row',
						listener: function(){
							this.option('filterModel.header', !this.option('filterModel.header'));
							this.refresh();
						}
					},
                    {
						type:'button',
						label: 'Reset filters',
						listener: function(){
							this.reset({filter: true});							
						}                        
                    }
				]
			},
            cellSave: function(evt, ui){
                this.refreshRow(ui);
            },
            scrollModel: { pace: 'consistent', horizontal: true },
            scrollModel: { autoFit: true }
    };


    var colM = [
        {
            dataIndx: "empresa",title:"Empresa", minWidth:120, dataType:"string", align: 'left', editable: true,
            filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'], style: 'width: 90px;' }
        
        },
        {dataIndx: "produto",title:"Produto", minWidth:120, dataType:"string"},
        {dataIndx: "quantidade",title:"Quantidade (kg/Unid.)", width:170, dataType:"integer", align:"left"},
        {dataIndx: "vVarejo",title:"Varejo", width:80, dataType:"float", align:"left", format: '$##,###.00'},
        {dataIndx: "vAtacado",title:"Atacado = Varejo - 10%", width:180, dataType:"float", align:"left",
            formula:
                function (ui){                           
                    var rd = ui.rowData; // obtendo a coluna
                    resultado = rd['vVarejo'] - (rd['vVarejo'] * 10 / 100);
                    if(resultado){
                        return parseFloat(resultado.toFixed(2));
                    }else{
                        return ' ';
                    }
                },
                format: '$##,###.00'
        },
        {dataIndx: "tipo", title: "Venda em", width: 80, dataType: "string", align: "left"},
        {dataIndx: "total", title: "Total = Varejo/Atacado * Qtd", width: 250, align: "right", dataType: "float",
            formula: function(ui){
                var rd = ui.rowData;
                var resultado;
                if(rd['tipo'] == 'varejo'){
                    resultado = parseFloat(rd['vVarejo'] * rd['quantidade']).toFixed(2);
                }else if(rd['tipo'] == 'atacado'){
                    resultado = parseFloat(rd['vAtacado'] * rd['quantidade']).toFixed(2);
                }else{
                    resultado = ' ';
                }
                return resultado;
            },
            format: '$##,###.00'
        }
    ];

    var gbj = {
            width: 800, height: 350,
            dataModel: dataModel,
            wrap: false,
            hwrap: false,
            showBottom: false,
            collapsible:false,
            colModel: colM,               
            title: "Tabela de Produtos e Valores",
            resizable: true,
            columnBorders: true,
            virtualX:true, virtualY:true,
            freezeCols: 2,
            cellSave: function(evt, ui){
                this.refreshRow(ui);
            }
    };





    var $grid = $("div#grid_sorting_remote").pqGrid(gbj);

});