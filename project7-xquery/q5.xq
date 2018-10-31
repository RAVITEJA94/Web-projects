<category>
{
for $x in doc('auction.xml')/site/categories/category
return
{	
{$x/@id},
<size>{count(doc('auction.xml')/site/people/person/profile/distinct-values(interest[@category = $x/@id]))}</size>
}
}
</category>

