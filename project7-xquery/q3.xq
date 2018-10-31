for $x in doc("auction.xml")/site/people/person
return
<persons>
{
if($x/@id = doc("auction.xml")/site/closed_auctions/closed_auction/buyer/@person) then (
{$x/name},
<NoOfItems>{count(doc("auction.xml")/site/closed_auctions/closed_auction/buyer[@person=$x/@id])}</NoOfItems>
)
else (
{$x/name},
<NoOfItems>0</NoOfItems>
)
}
</persons>