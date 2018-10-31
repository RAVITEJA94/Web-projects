for $x in doc("auction.xml")/site/regions//item
order by $x/name
return
<Item-list>
{
        {$x/@id},
        {$x/name},
        {$x/location}
}

</Item-list>
