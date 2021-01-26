function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#my-photo').attr('src', e.target.result);
            $('#my-photo').width(600);
            $("#my-photo").fadeIn(2000);
            $("#close-preview").show();
            
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function closePreview(){
    $("#my-photo").hide();
    $("#close-preview").hide();
    $("#getFile").val(null);
}