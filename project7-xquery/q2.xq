for $x in doc("auction.xml")/site/regions/europe/item
return{
<itemlist>
{$x/name}
{$x/description}
</itemlist>
}
