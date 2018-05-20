function read_data(data)
{
	document.getElementById('name').value 		= data.name;
	document.getElementById('email').value 		= data.email;
	document.getElementById('phone').value 		= data.phone;
	document.getElementById('usr_name').value 	= data.usr_name;
	document.getElementById('password').value 	= data.password;
	document.getElementById('id').value 		= data._id;

	document.getElementById('submit').textContent  = "Update";
	document.getElementById('modal_open').click();
}

function del(id)
{
	swal({title:'Are You Sure Delete This Data', icon:'warning', buttons:true, dangerMode:true})
    .then((willDelete) => {
      if(willDelete)
      {
	        fetch('delete',{
				method:'delete',
				headers: {'Content-Type':'application/json'},
				body:JSON.stringify({id:id})
			}).then(res => {
			  if (res.ok) return res.json()
			}).then(data => {
			  //window.location.reload(true)
			  window.location.href = "/?type=Delete";
			});
      }
    });
}

function form_reset(form)
{
    //$('#form')[0].reset();
    document.getElementById(form).reset();
    document.getElementById('submit').textContent  = "Save";
}

//Allow Only Nmber Digits /0-9/
function number(e)
{
    var k = e.which;
    if($.inArray(k, [0, 8, 9, 27, 13, 190]) == -1 && (k < 48 || k > 57) && (k < 2534 || k > 2543)) { return false; }
}
