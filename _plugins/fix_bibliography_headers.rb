# Jekyll hook to fix bibliography year headers
# This replaces numeric year codes with proper text in the rendered HTML

Jekyll::Hooks.register :pages, :post_render do |page|
  # Only process the publications page
  if page.path.include?('publications')
    # Replace numeric year headers with proper text
    page.output = page.output.gsub('<h2 class="bibliography">9999</h2>', '<h2 class="bibliography">in press</h2>')
    page.output = page.output.gsub('<h2 class="bibliography">9998</h2>', '<h2 class="bibliography">in preparation</h2>')
    page.output = page.output.gsub('<h2 class="bibliography">9997</h2>', '<h2 class="bibliography">submitted</h2>')
    page.output = page.output.gsub('<h2 class="bibliography">9996</h2>', '<h2 class="bibliography">under review</h2>')
    page.output = page.output.gsub('<h2 class="bibliography">9995</h2>', '<h2 class="bibliography">accepted</h2>')
    page.output = page.output.gsub('<h2 class="bibliography">9994</h2>', '<h2 class="bibliography">forthcoming</h2>')
  end
end 