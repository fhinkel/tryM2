
$cpus = 1;
$number = 10;
$ram = 512;
$zfs_original = "zfs_jails/master@1";
$zfs_prefix = "zfs_jails\/";

generate_xml_files();


sub generate_xml_files{
   for(my $i=1; $i<=$number; $i++){
      generate_xml_file($i);
   }
}

sub generate_xml_file{
   my($i) = @_;
   my $filename = "clone".$i.".xml";
   copy_original_xml_file("sample_clone.xml", $filename);
   insert_value_in_xml_file("CLONE_NAME", "clone$i", $filename);
   insert_value_in_xml_file("CLONE_PATH", $prefix."clone".$i, $filename);
   insert_value_in_xml_file("CLONE_SHIFT", "10000", $filename);
   insert_value_in_xml_file("CLONE_CPUS", "1", $filename);
   insert_value_in_xml_file("CLONE_RAM", "512", $filename);
}

sub copy_original_xml_file{
   my($original_xml, $copy_name) = @_;
   system "cp $original_xml $copy_name";
}

sub insert_value_in_xml_file{
   my($value, $replacement, $file) = @_;
   system "sed -i \'s\/$value\/$replacement\/g\' $file";
}

#ZFS_PREFIX
#CLONE_NAME
#CLONE_PATH
#CLONE_RAM
#CLONE_SHIFT
#CLONE_CPUS
