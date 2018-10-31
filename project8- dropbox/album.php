Dropbox App
"vnzayal7k79glwg", // Put your Dropbox API key here 'app_secret' => "g1wz00ajduxlcya", // Put your Dropbox API secret here 'app_full_access' => false, ) ); /** * Dropbox will redirect the user here * @var string $return_url */ $return_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . "?auth_redirect=1"; // first, try to load existing access token $bearer_token = demo_token_load( "bearer" ); if ( $bearer_token ) { $dropbox->SetBearerToken( $bearer_token ); //echo "loaded bearer token: " . json_encode( $bearer_token, JSON_PRETTY_PRINT ) . "\n"; } elseif ( ! empty( $_GET['auth_redirect'] ) ) // are we coming from dropbox's auth page? { // get & store bearer token $bearer_token = $dropbox->GetBearerToken( null, $return_url ); demo_store_token( $bearer_token, "bearer" ); } elseif ( ! $dropbox->IsAuthorized() ) { // redirect user to Dropbox auth page $auth_url = $dropbox->BuildAuthorizeUrl( $return_url ); die( "Authentication required. Continue." ); } ?>
Upload
select the picture: 

DownloadFile( '/'.$_GET['disp'], $fArray1.'/'.$fPath1 ); } if(isset($_GET['ImagPath']) && isset($_GET['act']) && $_GET['act'] == "delete") { $fPath2 = $_GET['ImagPath']; $fArray2 = $dropbox->GetFiles("",false); foreach ($fArray2 as $key=>$value) { if((string)$fPath2 == (string)$value->path) { $dropbox->Delete($value->path); } } } $files = $dropbox->GetFiles("",false); if(isset($_FILES['upload'])) { if($_FILES['upload']['tmp_name'] != ""){ $fPath = $_FILES['upload']['tmp_name']; $fName = $_FILES['upload']['name']; $dropbox->UploadFile($fPath,$fName); } else { echo "
"; echo "
"; echo "Please Select an Image"; echo "
"; } } ?>
List of the images
GetFiles("",false); foreach($jsonImages as $value) { ?>
Images
Delete
path)?> 

' width='350'/> 
