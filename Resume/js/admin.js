//扩展 dateTimeBox
$.extend($.fn.datagrid.defaults.editors, {
	datetimebox : {
		init: function(container, options){
			var input = $('<input type="text">').appendTo(container);
			options.editable = false;
			input.datetimebox(options);
			return input;
		},
		getValue: function(target){
			return $(target).datetimebox('getValue');
		},
		setValue: function(target, value){
			$(target).datetimebox('setValue', value);
		},
		resize: function(target, width){
			$(target).datetimebox('resize', width);
		},
		destroy : function (target) {
			$(target).datetimebox('destroy');
		},
	}
});
obj={
	edit_row:undefined,
	ajax:function (url,id) {
		$.ajax({
			type:'POST',
			url:url,
			data:{
				id:id
			},
			beforeSend:function (jqXHR,setting) {
				$('#datagrid').datagrid('loading');
			},
			success:function (data) {
				if (data) {
					$('#datagrid').datagrid('load');
					$('#datagrid').datagrid('loaded');
					$('#datagrid').datagrid('unselectAll');
					$.messager.show({
						title:'删除提示',
						msg:'成功删除'+(data)+'条数据'
					});
				}
			}
		});
	},
	search:function () {
		$('#datagrid').datagrid('load',{
			name:$.trim($('#tb').find('input[name="name_name"]').val()),
			create:$('input[name="create_time_name"]').val(),
			end:$('input[name="end_time_name"]').val()
		});
	},
	add:function () {
		if (this.edit_row == undefined) {
			$('#datagrid').datagrid('insertRow',{
				index:0,
				row:{
					
				}
			});
			//设置第一行可编辑
			$('#datagrid').datagrid('beginEdit',0);
			this.edit_row = 0;
		}
	},
	redo:function () {
		$('#datagrid').datagrid('rejectChanges');
		this.edit_row = undefined;
	},
	save:function () {
		var row = $('#datagrid').datagrid('getRows');
		if (row.length > 1) {
			for (var i = 0; i < row.length; i++) {
				var index = $('#datagrid').datagrid('getRowIndex',row[i]);
				$('#datagrid').datagrid('endEdit',index);
				$('#datagrid').datagrid('endEdit',this.edit_row)
			}
		}else {
			$('#datagrid').datagrid('endEdit',this.edit_row); //保存一个
		}
	},
	//编辑后执行 onAfterEdit
	edit:function () {
		var row = $('#datagrid').datagrid('getSelections');
		if (row.length > 0) {
			$.each(row,function (index,value) {
				var index2 = $('#datagrid').datagrid('getRowIndex',row[index]);
				$('#datagrid').datagrid('beginEdit',index2);
				$('#datagrid').datagrid('unselectRow',index2);
			});
		}
	},
	delete:function () {
		var rows = $('#datagrid').datagrid('getSelections');
		if (rows.length > 0) {
			$.messager.confirm('删除提示','是否删除?',function (flag) {
				if (flag) {
					var id = [];
					for (var i = 0; i < rows.length; i++) {
						id.push(rows[i].id);
					}
					obj.ajax('php/deleteMessage.php',id.join(','));
				}
			});
		}else {
			$.messager.alert('删除提示','选择要删除的数据','warning');
		}
	},
}
$(function () {
	$('#datagrid').datagrid({
		width:'100%',
		title:$('#admin').html()+'，Hello！',
		url:'php/showMessage.php',
		toolbar:'#tb',
		pagination:true,
		pageSize:20,
		pageList:[10,20,30],
		pageNumber:1,
		sortName:'date',
		sortOrder:'DESC',
		remoteSort:false,
		nowrap:false,
		rownumbers:true,
		fitColumns:true,//自适应
		// singleSelect:true,
		columns:[[
			{
				field:'id',
				title:'<th>ID</th>',
				sortable:true,
				width:30,
				checkbox:true
			},
			{
				field:'name',
				title:'<th>名称</th>',
				sortable:true,
				width:30,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},{
				field:'email',
				title:'<th>邮箱</th>',
				sortable:true,
				width:30,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},{
				field:'phone',
				title:'<th>电话</th>',
				sortable:true,
				width:30,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},{
				field:'content',
				title:'<th>内容</th>',
				sortable:true,
				width:100,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},{
				field:'date',
				title:'<th>时间</th>',
				sortable:true,
				width:30
			}
		]],
		onDblClickRow:function (rowIndex,rowData) {
			if (obj.edit_row != undefined) {
				$('#datagrid').datagrid('endEdit',obj.edit_row);
			}
			if(obj.edit_row == undefined){ // false
				$('#datagrid').datagrid('beginEdit',rowIndex);
				obj.edit_row = rowIndex;
			}
		},
		onAfterEdit:function (rowIndex,rowData,changes) {
			var inserted = $('#datagrid').datagrid('getChanges','inserted');
			var updated = $('#datagrid').datagrid('getChanges','updated');
			if (inserted.length > 0) {
				$.ajax({
					type:'POST',
					url:'php/adminAdd.php',
					data:{
						row:rowData
					},
					beforeSend:function (jqXHR,setting) {
						$('#datagrid').datagrid('loading');
					},
					success:function (data) {
						if (data) {
							$('#datagrid').datagrid('load');
							$('#datagrid').datagrid('loaded');
							$('#datagrid').datagrid('unselectAll');
							$.messager.show({
								title:'增加提示',
								content:'成功增加'+data+'条数据'
							});
							obj.edit_row = undefined;
						}
					}
				});
			}
			if (updated.length > 0) {
				$.each(updated,function (index,value) {
					$.ajax({
						type:'POST',
						url:'php/updateMessage.php',
						data:{
							row:updated[index]
						},
						beforeSend:function (jqXHR,setting) {
							$('#datagrid').datagrid('loading');
						},
						success:function (data) {
							if (data) {
								$('#datagrid').datagrid('load');
								$('#datagrid').datagrid('loaded');
								$('#datagrid').datagrid('unselectAll');
								$.messager.show({
									title:'修改提示',
									content:'成功修改'+updated.length+'条数据'
								});
								obj.edit_row = undefined;
							}
						}
					});
				});
			}
			obj.edit_row = undefined;
		},
		//右击事件
		onRowContextMenu:function (e,rowIndex,rowData) {
			//右键菜单
			e.preventDefault();
			$('#menu').menu('show',{
				left:e.pageX,
				top:e.pageY
			});
			//右键删除
			obj.r_delete = function () {
				$.messager.confirm('删除提示','是否删除'+rowData.name+'?',function (flag) {
					if (flag) {
						obj.ajax('php/deleteMessage.php',rowData.id);
					}
				});
			}
			//右键编辑
			obj.r_edit = function () {
				if (obj.edit_row != undefined) {
					obj.save();
				}
				if (obj.edit_row == undefined) {
					$('#datagrid').datagrid('beginEdit',rowIndex);
					$('#datagrid').datagrid('unselectRow',rowIndex);
					obj.edit_row = rowIndex;
				}
			}
		}
	});
	$('.pagination').pagination({
		layout:['first','prev','links','next','last','manual'],
		displayMsg:'{total}条数据'
	});
});
