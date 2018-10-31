for $x in doc("auction.xml")/site/regions/*
return{
<region name="{name($x)}">
<total>{count($x/item)}</total>
</region>
}
